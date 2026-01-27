import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updatePost } from '@/lib/actions'
import Link from 'next/link'
import { Fade } from '@/components/Fade'

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    }
  })

  const users = await prisma.users.findMany({
    orderBy: { name: 'asc'},
  });


  if (!post) notFound()

  const updatePostWithId = updatePost.bind(null, id)

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Edit your <span className="text-blue-600">story</span>
          </h1>
          <p className="text-xl text-gray-500 mt-4 leading-relaxed">
            Refine your thoughts and update your post.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-8 md:p-12">
          <form action={updatePostWithId} className="space-y-10">

             {/* Author Select */}
          <div className="space-y-3">
            <label
              htmlFor="authorId"
              className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
            >
              Author
            </label>

            <select
              id="authorId"
              name="authorId"
              required  
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl
                focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                transition-all outline-none text-lg text-gray-800"
            >
              <option value="" disabled selected>
                Select your name
              </option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name ?? 'Unnamed Author'}
                  {user.id === post.authorId && ' (current)'}
                </option>
              ))}
            </select>
            </div>

            <div className="space-y-3">
              <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={post.title}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg text-gray-800"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="content" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                defaultValue={post.content ?? ""}
                rows={10}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg text-gray-800 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-6 flex items-center gap-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-100"
              >
                Save Changes
              </button>
              <Link
                href={`/posts/${id}`}
                className="px-6 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
