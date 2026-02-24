# Liquid Glass Next.js Blog

A premium, modern, and performant blog platform built with Next.js 15, Prisma ORM, and Better Auth. Featuring a breathtaking "Liquid Glass" UI design aesthetic built on Tailwind CSS, this project provides an exquisite reading and writing experience.

![Hero Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop) *(Placeholder banner)*

## ✨ Features
* **Liquid Glass UI:** Beautiful transparent glass cards, dramatic typography, blur backdrops, and satisfying hover animations powered by Aceternity UI and Shadcn.
* **Full-stack Next.js 15:** Utilizes Next.js App Router, Server Components, Server Actions, and Turbopack for insane speeds.
* **Authentication:** Robust JWT & Cookie-based auth with Multiple Providers (Email, Google, Github), 2FA, and Password Resets via [Better Auth](https://www.better-auth.com/).
* **Database:** Robust type-safe interactions via Prisma ORM connected to PostgreSQL.
* **Dockerized:** Ready for scalable deployments via Docker and Docker Compose.

## 🚀 Getting Started

You can run this project locally on your machine or instantly spin it up inside a Docker container.

### Prerequisites

* [Node.js](https://nodejs.org/) 22+ or higher
* [Docker](https://www.docker.com/) (Optional, for containerized deployment)
* A PostgreSQL Database (Local or cloud like [Neon](https://neon.tech/))

---

### Method 1: Local Development (Recommended for coding)

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/nextjs-prisma.git
cd nextjs-prisma
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure Environment Variables:**
Rename the provided `.env.example` file to `.env` or create a new `.env` file in the root directory. Fill in your PostgreSQL database URL, your Better Auth secrets, and your OAuth app credentials.

```env
DATABASE_URL="postgresql://user:password@localhost:5432/superblog_db?schema=public"
NEXT_PUBLIC_API_URL=http://localhost:3000

# Generate a random 32 character string for this
BETTER_AUTH_SECRET=your_super_secret_string
BETTER_AUTH_URL=http://localhost:3000

# Only needed if you plan to use Google/Github login and Email OTPs
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SMTP_HOST=
SMTP_PORT=
NODEMAILER_USER=
NODEMAILER_APP_PASSWORD=
EMAIL_DOMAIN=
```

**4. Push Database Schema:**
Sync your Prisma schema with your fresh database to create all the necessary tables.
```bash
npx prisma db push
```

**5. Start the Development Server:**
```bash
npm run dev
```
Your app will be running at [http://localhost:3000](http://localhost:3000).

---

### Method 2: Docker Deployment

If you prefer to run the entire stack (Next.js Application + PostgreSQL Database) locally without installing Node.js directly, you can use Docker.

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/nextjs-prisma.git
cd nextjs-prisma
```

**2. Configure Environment Variables:**
Create your `.env` file just like in Method 1. Since the provided `docker-compose.yml` spins up a PostgreSQL container named `db` internally, **you MUST set your `DATABASE_URL` to point to the docker container:**

```env
DATABASE_URL=postgresql://user:password@db:5432/superblog_db?schema=public
NEXT_PUBLIC_API_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secret_string
BETTER_AUTH_URL=http://localhost:3000
# ... add OAuth/SMTP credentials as needed ...
```

**3. Build and Start the Containers:**
```bash
docker compose up --build -d
```

**4. Generate Database Tables (First time only):**
Once the containers are running for the first time, your database is empty. Push the Prisma schema from your host machine into the running Docker container via its exposed port `5432`:
```powershell
# Windows Powershell
$env:DATABASE_URL="postgresql://user:password@localhost:5432/superblog_db?schema=public"; npx prisma db push

# Mac/Linux bash:
# DATABASE_URL="postgresql://user:password@localhost:5432/superblog_db?schema=public" npx prisma db push
```

Your app will be up and running at [http://localhost:3000](http://localhost:3000).

## 🛠️ Stack Architecture

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Components:** Shadcn UI + Radix Primitives + Lucide Icons + Framer Motion
* **ORM:** Prisma
* **Authentication:** Better Auth
* **Infrastructure:** Docker
