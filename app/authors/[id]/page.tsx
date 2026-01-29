import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!id) notFound()

  const user = await prisma.user.findUnique({
    where: { id },
    include: { 
      posts: {
        orderBy: { createdAt: 'desc' }
      } 
    },
  })

  if (!user) notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Link>

        {/* Profile Header */}
        <div className="bg-card rounded-3xl border shadow-sm overflow-hidden mb-12">
          <div className="h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="px-8 pb-8 -mt-16 flex flex-col md:flex-row items-end md:items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={user.image || ''} alt={user.name} />
              <AvatarFallback className="text-4xl font-bold bg-muted text-muted-foreground">
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2 text-center md:text-left pt-2">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {format(new Date(user.createdAt), 'MMMM yyyy')}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {user.posts.length} Posts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-2">Published Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="group block h-full">
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground pt-2">
                      {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.content || 'No preview available.'}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      Read more <ArrowLeft className="ml-1 h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {user.posts.length === 0 && (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
              <p className="text-muted-foreground text-lg">
                This user hasn't published any stories yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
