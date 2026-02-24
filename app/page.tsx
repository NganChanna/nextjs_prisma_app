import { getFeedPosts } from "@/lib/actions/feed.action";
import { Feed } from "@/components/home/Feed";
import { Hero } from "@/components/home/Hero";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await getFeedPosts();

  return (
    <div className="w-full h-full pb-32">
      <main className="container max-w-5xl mx-auto px-4 sm:px-6">
        <Hero />
        <Feed posts={posts} />
      </main>
    </div>
  );
}