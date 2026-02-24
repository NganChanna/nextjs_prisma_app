import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";

interface FeedProps {
  posts: any[];
}

export function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center w-full max-w-3xl mx-auto">
        <div className="h-24 w-24 rounded-full glass-panel flex items-center justify-center mb-8 shadow-2xl">
          <div className="h-10 w-10 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">The void is empty</h3>
        <p className="text-muted-foreground max-w-md text-lg">No posts available right now. Be the first to illuminate this space with your thoughts.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 max-w-3xl mx-auto w-full pb-20 mt-8">
      {posts.map((post, i) => (
        <Link href={`/posts/${post.id}`} key={post.id} className="block group cursor-pointer outline-none">
          <div
            className="relative glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
                    <Avatar className="h-14 w-14 border-[3px] border-white/10 relative z-10 group-hover:border-primary/50 transition-colors bg-[#0a0a0f]">
                      <AvatarImage src={post.author?.image || ""} alt={post.author?.name || "Author"} className="object-cover" />
                      <AvatarFallback className="bg-transparent text-primary font-bold text-lg hidden sm:flex">
                        {post.author?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-bold text-white/90 group-hover:text-white transition-colors text-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href={`/authors/${post.author?.id}`} className="hover:underline decoration-primary underline-offset-4">
                        {post.author?.name || "Unknown Author"}
                      </Link>
                    </span>
                    <span className="text-sm text-muted-foreground/80 font-medium tracking-wide">
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground/90 line-clamp-3 text-lg leading-relaxed">
                  {post.content}
                </p>
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
          </div>
        </Link>
      ))}
    </div>
  );
}
