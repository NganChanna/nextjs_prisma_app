import { getFeedPosts } from "@/lib/actions/feed.action";
import { Feed } from "@/components/home/Feed";
import { Search } from "@/components/home/Search";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await getFeedPosts();

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            News Feed
          </h1>
          <p className="text-muted-foreground mb-8">
            See what others are sharing.
          </p>
          
          <Search />
        </div>

        <Feed posts={posts} />
      </main>
    </div>
  );
}