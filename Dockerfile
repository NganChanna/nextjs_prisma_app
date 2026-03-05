# Use Node.js 24 Alpine for a small footprint
FROM node:24-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Install openssl for Prisma schema generation compatibility
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies, bypassing postinstall scripts (avoids early prisma generate failure)
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Explicitly generate the Prisma client
RUN npx prisma generate

# Provide dummy build-time environment variables.
# Next.js statically pre-renders pages at build time. For pages that fetch from Prisma,
# this prevents the build from crashing when .env isn't available.
ENV BETTER_AUTH_SECRET=placeholder
ENV DATABASE_URL=postgresql://placeholder_user:placeholder_pass@localhost:5432/placeholder_db
ENV NEXT_PUBLIC_API_URL=http://localhost:3000

# Build Next.js application
RUN npm run build


# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js standalone mode + Prisma requires openssl in the runner container too
RUN apk add --no-cache openssl

# Secure container by running as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
