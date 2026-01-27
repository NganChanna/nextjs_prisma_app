import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Fade } from '@/components/Fade'

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  })

  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-20">
      <main className="max-w-3xl mx-auto">
        
        {/* Header */}
        <Fade>
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Latest <span className="text-blue-600">Stories</span>
            </h1>
            <p className="mt-4 text-xl text-gray-500 leading-relaxed">
              Explore the latest insights and thoughts from our community.
            </p>
          </header>
        </Fade>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post, i) => (
            <Fade key={post.id} delay={0.05 + i * 0.05}>
              <article className="group bg-white border border-gray-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                
                {/* Title */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Article
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <div className="mr-2 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {post.author?.name?.charAt(0) || 'U'}
                  </div>

                  <span className="font-medium text-gray-700">
                    {post.author?.name ?? 'Unknown Author'}
                  </span>

                  <span className="mx-2 text-gray-300">•</span>
                  <span>5 min read</span>
                </div>

                {/* Excerpt */}
                <p className="mt-5 text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {post.content?.substring(0, 160) || 'No content available.'}
                </p>

                {/* Action */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <Link
                    href={`/posts/${post.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
                  >
                    Read full post
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            </Fade>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <Fade>
            <div className="mt-20 rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <p className="text-gray-500 italic">
                No posts yet. Start writing your first story.
              </p>
            </div>
          </Fade>
        )}
      </main>
    </div>
  )
}
