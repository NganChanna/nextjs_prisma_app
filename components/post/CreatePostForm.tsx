"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { createPost } from '@/lib/actions/actions'

export default function CreatePostForm() {
  const router = useRouter()

  async function clientAction(formData: FormData) {
    const promise = createPost(formData)
    
    toast.promise(promise, {
      loading: 'Posting...',
      success: () => {
        router.push('/')
        return 'Posted'
      },
      error: 'Failed to create post',
    })
  }

  return (
    <form action={clientAction} className="space-y-8">
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
    </form>
  )
}
