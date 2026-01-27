import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Fade } from '@/components/Fade'

export default async function Home() {
  const users = await prisma.users.findMany()

  return (
    <div className="min-h-screen bg-[#fafafa] font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6 leading-tight">
            Share your <span className="text-blue-600">story</span> with the world.
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            A modern space for thinkers and creators. Join our community of contributors today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/posts" 
              className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 text-lg"
            >
              Read Stories
            </Link>
            <Link 
              href="/posts/new" 
              className="bg-white border border-gray-200 text-gray-600 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all text-lg"
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
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Authors</h2>
            <p className="text-gray-500 mt-1">Discover the voices behind our latest posts</p>
          </div>
          <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm text-gray-500 font-semibold shadow-sm">
            {users.length} Contributors
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-500">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">Author</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-50">
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
            <div className="mt-20 rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <p className="text-gray-500">
                No authors yet. Be the first to join.
              </p>
            </div>
          </Fade>
        )}
      </main>
    </div>
  )
}
