"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getFeedPosts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  // Fetch posts where authorId is NOT the current user's ID
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(userId ? { authorId: { not: userId } } : {}),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Default sorting for now, will shuffle in memory
    },
    take: 50, // Fetch limit to avoid overloading
  });

  // Shuffle posts to mimic "random all the time"
  const shuffledPosts = posts.sort(() => 0.5 - Math.random());

  return shuffledPosts;
}

export async function searchAuthors(query: string) {
  if (!query) return [];

  const authors = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      _count: {
        select: { posts: true },
      },
    },
    take: 10,
  });

  return authors;
}
