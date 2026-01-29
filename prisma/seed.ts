import { PrismaClient, Prisma } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

// 🧠 All seed data in Prisma.UserCreateInput format
const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    emailVerified: true,
    image: "https://i.pravatar.cc/150?img=1",

    posts: {
      create: [
        {
          title: "First Post",
          content: "Hello from Alice",
          published: true,
        },
      ],
    },

    sessions: {
      create: [
        {
          token: "session_token_123",
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          ipAddress: "127.0.0.1",
          userAgent: "Chrome",
        },
      ],
    },

    accounts: {
      create: [
        {
          accountId: "google_123",
          providerId: "google",
          accessToken: "access_token_example",
          refreshToken: "refresh_token_example",
          scope: "email profile",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@example.com",
    emailVerified: false,
    image: "https://i.pravatar.cc/150?img=2",

    posts: {
      create: [
        {
          title: "Second Post",
          content: "Bob is writing something",
          published: false,
        },
      ],
    },
  },
]

export async function main() {
  console.log("🌱 Seeding database...")

  // 🧹 Clean existing data (order matters)
  await prisma.post.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  // 🌱 Insert users with nested relations
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }

  // ✉️ Verification (not directly related to User)
  await prisma.verification.create({
    data: {
      identifier: "alice@example.com",
      value: "verification_code_123456",
      expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    },
  })

  console.log("✅ Seed completed successfully")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
