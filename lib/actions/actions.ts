"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = session.user.id;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      published: true,
    },
  });

  revalidatePath("/");
  revalidatePath("/posts");
  
  return post;
}

export async function updatePost(id: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.authorId !== session.user.id) {
    throw new Error("Forbidden");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/posts");
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
}

export async function deletePost(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.authorId !== session.user.id) {
    throw new Error("Forbidden");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/posts");
  redirect("/posts");
}
