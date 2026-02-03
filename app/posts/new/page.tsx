import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ArrowLeft } from 'lucide-react'
import CreatePostForm from '@/components/post/CreatePostForm'

export default async function NewPost() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin')
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
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}