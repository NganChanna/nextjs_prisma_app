import Form from 'next/form'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/shared/SubmitButton'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default async function NewPost() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin')
  }

  async function createPost(formData: FormData) {
    'use server'

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      throw new Error('Unauthorized')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorId = session.user.id
   
    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: true,
      },
    })

    revalidatePath('/')
    revalidatePath('/posts')
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create a New Post</h1>
          <p className="text-muted-foreground">Share your thoughts, ideas, or stories with the community.</p>
        </div>

        <div className="bg-card border rounded-xl p-6 md:p-10 shadow-sm">
          <Form action={createPost} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Title
              </label>
              <Input
                id="title"
                name="title"
                required
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
                placeholder="Write your story here..."
                className="flex min-h-[400px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <Link href="/">
                <Button variant="ghost" type="button">Cancel</Button>
              </Link>
              <SubmitButton />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}