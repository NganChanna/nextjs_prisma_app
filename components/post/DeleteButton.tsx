"use client";

import { deletePost } from "@/lib/actions/actions";
import { useTransition } from "react";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Are you sure you want to delete this post?")) {
          startTransition(() => deletePost(id));
        }
      }}
      disabled={isPending}
      className="text-sm font-bold text-red-500 hover:text-red-600 transition-all bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500/20 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
}
