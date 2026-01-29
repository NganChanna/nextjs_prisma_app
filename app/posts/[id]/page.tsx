import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { DeleteButton } from "@/components/post/DeleteButton"
import { Fade } from '@/components/shared/Fade'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit2 } from 'lucide-react'

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
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Link>

        <Fade>
          <article>
            {/* Header */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between border-b pb-8">
                <div className="flex items-center gap-4">
                  <Link href={`/authors/${post.authorId}`}>
                    <Avatar className="h-12 w-12 border shadow-sm">
                      <AvatarImage src={post.author?.image || ''} alt={post.author?.name || 'Author'} />
                      <AvatarFallback>{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link href={`/authors/${post.authorId}`} className="block font-semibold text-foreground hover:underline">
                      {post.author?.name ?? 'Unknown Author'}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>

                {isAuthor && (
                  <div className="flex items-center gap-2">
                    <Link href={`/posts/${id}/edit`}>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <DeleteButton id={id} />
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <Fade delay={0.1}>
              <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                {post.content ? (
                  post.content
                ) : (
                  <p className="italic text-muted-foreground">
                    This post has no content.
                  </p>
                )}
              </div>
            </Fade>
          </article>
        </Fade>
      </div>
    </div>
  )
}
