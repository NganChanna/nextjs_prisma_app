import Form from 'next/form'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'

export default async function NewPost() {

  const users = await prisma.users.findMany({
    orderBy: { name: 'asc'},
  });

  async function createPost(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorId = formData.get('authorId') as string

    if (!authorId) {
      throw new Error('Author is required')
    }
   
    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: true,
      },
    })

    revalidatePath('/posts')
    redirect('/posts')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-tight">
            Draft a new <span className="text-blue-600">story</span>
          </h1>
          <p className="text-xl text-gray-500 mt-4 leading-relaxed">
            Share your thoughts with the world. Your post will be published immediately.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-8 md:p-12">
          <Form action={createPost} className="space-y-10">

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
                </option>
              ))}
            </select>
            </div>


            {/* Title Input */}
            <div className="space-y-3">
              <label 
                htmlFor="title" 
                className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="What's on your mind?"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-3">
              <label 
                htmlFor="content" 
                className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                placeholder="Start typing your story..."
                rows={10}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-lg text-gray-800 placeholder:text-gray-400 resize-none leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex items-center gap-6">
                <SubmitButton />
                
                <Link
                    href="/posts"
                    className="px-6 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
                >
                    Cancel
                </Link>
            </div>
          </Form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          Tip: You can use Markdown-style formatting in the content area.
        </p>
      </div>
    </div>
  );
}