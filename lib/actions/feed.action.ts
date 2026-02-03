"use server";

import prisma from "@/lib/prisma";

export async function getFeedPosts() {

  // Fetch all published posts
  const posts = await prisma.post.findMany({
    where: {
      published: true,
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
      createdAt: "desc",
    },
    take: 50,
  });

  return posts;
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

export async function getArticlePosts() {
	  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return posts
}