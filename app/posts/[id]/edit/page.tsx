import prisma from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { updatePost } from '@/lib/actions/actions'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/shared/SubmitButton'

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin')
  }

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    }
  })

  if (!post) notFound()

  if (post.authorId !== session.user.id) {
    redirect(`/posts/${id}`)
  }

  const updatePostWithId = updatePost.bind(null, id)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href={`/posts/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Post
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Edit Post</h1>
          <p className="text-muted-foreground">Make changes to your story.</p>
        </div>

        <div className="bg-card border rounded-xl p-6 md:p-10 shadow-sm">
          <form action={updatePostWithId} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Title
              </label>
              <Input
                id="title"
                name="title"
                required
                defaultValue={post.title}
                placeholder="Give your post a catchy title"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                required
                defaultValue={post.content ?? ""}
                placeholder="Write your story here..."
                className="flex min-h-[400px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <Link href={`/posts/${id}`}>
                <Button variant="ghost" type="button">Cancel</Button>
              </Link>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
