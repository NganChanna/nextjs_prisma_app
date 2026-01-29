import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FeedProps {
  posts: any[];
}

export function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>No posts available. Be the first to write something!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 max-w-2xl mx-auto">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center gap-4 pb-4 bg-muted/20">
            <Link href={`/authors/${post.author?.id}`}>
              <Avatar className="h-10 w-10 cursor-pointer border hover:border-primary transition-colors">
                <AvatarImage src={post.author?.image || ""} alt={post.author?.name || "Author"} />
                <AvatarFallback>{post.author?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link href={`/authors/${post.author?.id}`} className="font-semibold hover:underline">
                {post.author?.name || "Unknown Author"}
              </Link>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Link href={`/posts/${post.id}`} className="block group">
              <CardTitle className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {post.content}
              </p>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
