import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FadeUp } from '@/components/Motion'

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) notFound()

  const user = await prisma.users.findUnique({
    where: { id },
    include: { posts: true },
  })

  if (!user) notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Avatar */}
              <div className="h-40 w-40 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl font-black text-white shadow-2xl shadow-blue-500/20">
                {user.name?.charAt(0) || 'U'}
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-5xl font-black tracking-tighter text-foreground leading-tight">
                  {user.name ?? 'Anonymous Author'}
                </h1>

                <p className="mt-4 text-xl text-muted-foreground font-medium">{user.email}</p>

                <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-500/10 px-6 py-2.5 text-blue-600 font-bold text-sm">
                  <span className="text-lg">{user.posts.length}</span>
                  <span>Articles Published</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Posts */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        <FadeUp delay={0.1}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              Published Articles
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {user.posts.map((post, i) => (
            <FadeUp key={post.id} delay={0.15 + i * 0.05}>
              <Link href={`/posts/${post.id}`} className="group block h-full">
                <article className="relative h-full rounded-[2rem] bg-card p-8 border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/20">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">
                    {post.content || 'No content available.'}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                    Read article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </div>

        {user.posts.length === 0 && (
          <FadeUp>
            <div className="text-center text-muted-foreground mt-20">
              No posts published yet.
            </div>
          </FadeUp>
        )}
      </main>
    </div>
  )
}
