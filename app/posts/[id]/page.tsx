import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DeleteButton } from '@/components/DeleteButton'
import { Fade } from '@/components/Fade'

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

  return (
    <div className="min-h-screen bg-background selection:bg-blue-100 px-6 py-20">
      <main className="max-w-3xl mx-auto">
        <Fade>
          <article className="bg-card rounded-[2.5rem] border border-border shadow-sm p-8 md:p-16">
            
            {/* Action Bar */}
            <div className="flex justify-end gap-6 mb-12">
              <Link
                href={`/posts/${id}/edit`}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition bg-blue-500/10 px-4 py-2 rounded-full"
              >
                Edit Post
              </Link>
              <DeleteButton id={id} />
            </div>

            {/* Title */}
            <Fade delay={0.05}>
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1] mb-10">
                {post.title}
              </h1>
            </Fade>

            {/* Author */}
            <Fade delay={0.1}>
              <div className="flex items-center gap-4 border-t border-border pt-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                  {post.author?.name?.charAt(0) || 'U'}
                </div>

                <div>
                  <p className="text-lg font-bold text-foreground">
                    {post.author?.name ?? 'Unknown Author'}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    {' • '}5 min read
                  </p>
                </div>
              </div>
            </Fade>

            {/* Content */}
            <Fade delay={0.15}>
              <div className="text-lg text-foreground leading-relaxed space-y-6 mt-12">
                {post.content ? (
                  post.content.split('\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))
                ) : (
                  <p className="italic text-muted-foreground">
                    This post has no content.
                  </p>
                )}
              </div>
            </Fade>

            {/* Tags */}
            <Fade delay={0.2}>
              <footer className="mt-16 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {['Technology', 'Insights', 'Development'].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:bg-blue-500/10 hover:text-blue-600 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </footer>
            </Fade>
          </article>
        </Fade>
      </main>
    </div>
  )
}
