import prisma from '@/lib/prisma'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Fade } from '@/components/shared/Fade'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'

export default async function Posts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Explore Stories
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover the latest perspectives from our writers.
            </p>
          </div>
          <Link href="/posts/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Write a Story
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Fade key={post.id} delay={i * 0.05}>
              <Link href={`/posts/${post.id}`} className="group block h-full">
                <article className="flex flex-col h-full bg-card border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author?.image || ''} alt={post.author?.name || 'Author'} />
                        <AvatarFallback>{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <p className="font-medium text-foreground">{post.author?.name || 'Unknown'}</p>
                        <p className="text-muted-foreground">
                          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                      {post.content || 'No preview available.'}
                    </p>
                  </div>
                  
                  <div className="px-6 py-4 bg-muted/20 border-t mt-auto flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span>5 min read</span>
                    <span className="text-primary group-hover:underline">Read full story</span>
                  </div>
                </article>
              </Link>
            </Fade>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <Fade>
            <div className="mt-20 py-20 text-center border-2 border-dashed rounded-3xl bg-muted/10">
              <p className="text-muted-foreground text-lg mb-6">
                No stories have been published yet.
              </p>
              <Link href="/posts/new">
                <Button variant="outline">Be the first to write one</Button>
              </Link>
            </div>
          </Fade>
        )}
      </div>
    </div>
  )
}
