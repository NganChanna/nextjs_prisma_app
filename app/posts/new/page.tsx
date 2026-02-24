import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { ArrowLeft, PenTool } from 'lucide-react'
import CreatePostForm from '@/components/post/CreatePostForm'
import { Fade } from '@/components/shared/Fade'

export default async function NewPost() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="w-full h-full pb-32 pt-8">
      {/* Background glow specific to the composer */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-purple-600/10 to-transparent opacity-50 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <Link href="/posts" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors mb-12 group">
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to Feed
        </Link>

        <Fade>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full glass-panel flex items-center justify-center border border-white/10 shadow-xl">
              <PenTool className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Create a New Post</h1>
              <p className="text-lg text-muted-foreground">Share your thoughts, ideas, or stories with the community.</p>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
            <CreatePostForm />
          </div>
        </Fade>
      </div>
    </div>
  );
}