import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Fade } from '@/components/shared/Fade'

export const dynamic = 'force-dynamic'

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) notFound()

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' }
      }
    },
  })

  if (!user) notFound()

  return (
    <div className="w-full h-full pb-32 pt-8">
      {/* Background glow specific to the profile */}
      <div className="fixed top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent opacity-50 pointer-events-none -z-10" />

      <div className="container max-w-5xl mx-auto px-6">
        <Link href="/posts" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors mb-8 group">
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to Feed
        </Link>

        {/* Profile Header */}
        <Fade>
          <div className="glass-card rounded-[2.5rem] overflow-hidden mb-16 relative border border-white/10 shadow-2xl">
            {/* Cover Photo Area */}
            <div className="h-40 sm:h-56 bg-gradient-to-r from-blue-600/20 to-purple-600/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_100%)"></div>
            </div>

            <div className="px-8 sm:px-12 pb-10 sm:pb-12 -mt-20 sm:-mt-24 flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8 relative z-10">
              <div className="relative group/avatar">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur opacity-40 group-hover/avatar:opacity-75 transition duration-500" />
                <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-[6px] border-[#0a0a0f] shadow-2xl relative z-10 bg-[#0a0a0f]">
                  <AvatarImage src={user.image || ''} alt={user.name} className="object-cover" />
                  <AvatarFallback className="text-5xl font-black bg-transparent text-primary">
                    {user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 space-y-3 text-center md:text-left pt-2 pb-2">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-muted-foreground/80">
                  <span className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10">
                    <Calendar className="h-4 w-4 text-primary" />
                    Joined {format(new Date(user.createdAt), 'MMMM yyyy')}
                  </span>
                  <span className="flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10">
                    <FileText className="h-4 w-4 text-primary" />
                    {user.posts.length} Stories Published
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Posts Grid */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Latest Stories</h2>
            <div className="h-px bg-white/10 flex-1 ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {user.posts.map((post, i) => (
              <Fade key={post.id} delay={i * 0.1}>
                <Link href={`/posts/${post.id}`} className="group block h-full outline-none">
                  <Card className="h-full glass-card border border-white/10 rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary">
                    <CardHeader className="p-6 sm:p-8 pb-4">
                      <CardTitle className="line-clamp-2 text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                      <div className="text-sm font-semibold text-muted-foreground pt-3 tracking-wide">
                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8 pt-0 flex flex-col h-full">
                      <p className="text-muted-foreground/80 line-clamp-3 leading-relaxed text-base flex-1">
                        {post.content || 'No preview available.'}
                      </p>
                      <div className="mt-6 flex items-center justify-between text-sm font-bold text-primary w-full border-t border-white/10 pt-4">
                        <span className="tracking-widest uppercase text-xs">Read Story</span>
                        <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </Fade>
            ))}
          </div>

          {user.posts.length === 0 && (
            <Fade delay={0.2}>
              <div className="text-center py-24 glass-panel rounded-[3rem] border border-white/5 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-white text-xl font-bold mb-2">
                  No stories yet
                </p>
                <p className="text-muted-foreground">
                  This creative mind is still gathering their thoughts.
                </p>
              </div>
            </Fade>
          )}
        </div>
      </div>
    </div>
  )
}
