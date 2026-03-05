import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { DeleteButton } from "@/components/post/DeleteButton"
import { Fade } from '@/components/shared/Fade'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Edit2, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) notFound()

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })

  if (!post) notFound()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAuthor = session?.user?.id === post.authorId

  return (
    <div className="w-full h-full pb-32 pt-8">
      {/* Background glow specific to the post reading experience */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <Link href="/posts" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors mb-12 group">
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to Feed
        </Link>

        <Fade>
          <article className="relative">
            {/* Header */}
            <header className="mb-14">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70 mb-8 leading-[1.1]">
                {post.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                  <Link href={`/authors/${post.authorId}`} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500" />
                    <Avatar className="h-14 w-14 border-[3px] border-white/10 relative z-10 bg-[#0a0a0f]">
                      <AvatarImage src={post.author?.image || ''} alt={post.author?.name || 'Author'} className="object-cover" />
                      <AvatarFallback className="text-primary font-bold">{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col">
                    <Link href={`/authors/${post.authorId}`} className="text-lg font-bold text-white hover:text-primary transition-colors">
                      {post.author?.name ?? 'Unknown Author'}
                    </Link>
                    <div className="flex items-center text-sm font-medium text-muted-foreground gap-3 mt-1">
                      <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 5 min read
                      </span>
                    </div>
                  </div>
                </div>

                {isAuthor && (
                  <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full border border-white/10">
                    <Link
                      href={`/posts/${id}/edit`}
                      className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                    <div className="w-px h-4 bg-white/20" />
                    <DeleteButton id={id} />
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <Fade delay={0.2}>
              <div className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed whitespace-pre-wrap selection:bg-primary/30 selection:text-white">
                {post.content ? (
                  <p className="first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[0.8]">
                    {post.content}
                  </p>
                ) : (
                  <p className="italic text-muted-foreground/60 text-center py-20 text-xl font-medium">
                    This masterpiece is currently empty.
                  </p>
                )}
              </div>
            </Fade>

            {/* Share / Bottom Bar area (minimalist) */}
            <div className="mt-20 pt-8 border-t border-white/10 flex justify-center">
              <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                End of story. <span className="text-primary hover:text-purple-400 cursor-pointer transition-colors">Share it</span>
              </div>
            </div>

          </article>
        </Fade>
      </div>
    </div>
  )
}
