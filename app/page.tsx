import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Fade } from '@/components/Fade'

export default async function Home() {
  const users = await prisma.users.findMany()

  return (
    <div className="min-h-screen bg-background font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-card border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-tight">
            Share your <span className="text-blue-600">story</span> with the world.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            A modern space for thinkers and creators. Join our community of contributors today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/posts" 
              className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 text-lg"
            >
              Read Stories
            </Link>
            <Link 
              href="/posts/new" 
              className="bg-card border border-border text-muted-foreground px-10 py-4 rounded-full font-bold hover:bg-accent transition-all text-lg"
            >
            Start Writing
            </Link>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <main className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Featured Authors</h2>
            <p className="text-muted-foreground mt-1">Discover the voices behind our latest posts</p>
          </div>
          <span className="bg-card border border-border px-4 py-1.5 rounded-full text-sm text-muted-foreground font-semibold shadow-sm">
            {users.length} Contributors
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="group bg-card p-8 rounded-3xl border border-border hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-500">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">Author</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <Link 
                  href={`/authors/${user.id}`} 
                  className="text-sm font-bold text-blue-600 flex items-center gap-2 group/link"
                >
                  View Profile
                  <svg className="w-4 h-4 translate-x-0 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <Fade>
            <div className="mt-20 rounded-3xl border border-dashed border-border bg-card py-20 text-center">
              <p className="text-muted-foreground">
                No authors yet. Be the first to join.
              </p>
            </div>
          </Fade>
        )}
      </main>
    </div>
  )
}
