import { getArticlePosts } from '@/lib/actions/feed.action'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Fade } from '@/components/shared/Fade'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Plus, ArrowUpRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Posts() {

  const posts = await getArticlePosts();

  return (
    <div className="w-full h-full pb-20 mt-10">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">

        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="relative">
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors mb-6 group">
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
              Explore Stories
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover the latest perspectives from our writers in this glassmorphic venue.
            </p>
          </div>
          <Link href="/posts/new">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Plus className="h-5 w-5" />
              Write a Story
            </button>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Fade key={post.id} delay={i * 0.05} className="h-full">
              <Link href={`/posts/${post.id}`} className="group block h-full outline-none">
                <article className="flex flex-col h-full glass-card border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-primary relative">

                  {/* Hover Accent Map */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white/10 bg-[#0a0a0f] group-hover:border-primary/50 transition-colors">
                          <AvatarImage src={post.author?.image || ''} alt={post.author?.name || 'Author'} className="object-cover" />
                          <AvatarFallback className="bg-transparent text-primary font-bold">
                            {post.author?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-bold text-white/90 group-hover:text-white transition-colors text-sm truncate max-w-[120px]">
                            {post.author?.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-muted-foreground/80 font-medium">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>

                      <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all line-clamp-2 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground/80 text-sm sm:text-base line-clamp-3 leading-relaxed mb-6">
                      {post.content || 'No preview available.'}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      <span>5 min read</span>
                      <span className="text-primary group-hover:text-purple-400 transition-colors">Read Story</span>
                    </div>
                  </div>

                  {/* Bottom Line Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
                </article>
              </Link>
            </Fade>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <Fade>
            <div className="mt-16 py-32 text-center border border-white/10 rounded-[3rem] glass-panel flex flex-col items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-xl">
                <Plus className="h-8 w-8 text-primary opacity-50" />
              </div>
              <p className="text-white text-2xl font-bold mb-2">
                No stories published
              </p>
              <p className="text-muted-foreground max-w-sm mb-8 relative z-10">
                The canvas is blank. Be the first to share your creative thoughts.
              </p>
              <Link href="/posts/new" className="relative z-10">
                <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Start Writing
                </button>
              </Link>
            </div>
          </Fade>
        )}
      </div>
    </div>
  )
}
