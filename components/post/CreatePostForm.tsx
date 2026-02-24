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
      loading: 'Publishing your story...',
      success: () => {
        router.push('/posts')
        return 'Story published successfully!'
      },
      error: 'Failed to create post. Please try again.',
    })
  }

  return (
    <form action={clientAction} className="space-y-8">
      <div className="space-y-3">
        <label htmlFor="title" className="text-sm font-bold text-white/80 uppercase tracking-wider ml-1">
          Story Title
        </label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Give your masterpiece a catchy title..."
          className="text-xl sm:text-2xl py-8 px-6 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary focus-visible:border-primary rounded-2xl transition-all shadow-inner"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between ml-1">
          <label htmlFor="content" className="text-sm font-bold text-white/80 uppercase tracking-wider">
            Story Content
          </label>
          <span className="text-xs font-semibold text-muted-foreground/60 border border-white/10 rounded-md px-2 py-0.5">Markdown Supported</span>
        </div>
        <textarea
          id="content"
          name="content"
          required
          placeholder="Write your story here. Let your imagination run wild..."
          className="flex min-h-[400px] w-full rounded-2xl border border-white/10 bg-black/30 px-6 py-6 text-lg text-white shadow-inner placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all"
        />
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10 mt-10">
        <Link href="/posts">
          <Button variant="ghost" type="button" className="rounded-xl px-6 h-12 text-white hover:bg-white/5 hover:text-white transition-colors">
            Cancel
          </Button>
        </Link>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
