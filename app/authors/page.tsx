import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Fade } from '@/components/shared/Fade'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, ChevronRight, FileText, Users } from 'lucide-react'
    
export const dynamic = 'force-dynamic'

export default async function AuthorsDirectory() {
    const authors = await prisma.user.findMany({
        include: {
            _count: {
                select: {
                    posts: true
                }
            }
        },
        orderBy: {
            posts: {
                _count: 'desc'
            }
        }
    })

    return (
        <div className="w-full h-full pb-32 pt-8">
            {/* Background glow specific to the authors page */}
            <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-600/10 to-transparent opacity-50 pointer-events-none -z-10" />

            <div className="container max-w-5xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-white transition-colors mb-10 group">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </span>
                    Back to Home
                </Link>

                {/* Header */}
                <Fade>
                    <div className="flex items-center gap-4 mb-16">
                        <div className="h-16 w-16 rounded-full glass-panel flex items-center justify-center border border-white/10 shadow-xl">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">Our Authors</h1>
                            <p className="text-lg text-muted-foreground">Discover the brilliant minds behind the stories.</p>
                        </div>
                    </div>
                </Fade>

                {/* Authors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {authors.map((author, i) => (
                        <Fade key={author.id} delay={i * 0.05} className="h-full">
                            <Link href={`/authors/${author.id}`} className="group block h-full outline-none">
                                <article className="flex flex-col h-full glass-card border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary relative">

                                    {/* Hover Accent Map */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div className="p-6 flex flex-col items-center text-center relative z-10">
                                        <div className="relative mb-6 group/avatar">
                                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
                                            <Avatar className="h-24 w-24 border-[4px] border-white/10 bg-[#0a0a0f] relative z-10 transition-colors">
                                                <AvatarImage src={author.image || ''} alt={author.name || 'Author'} className="object-cover" />
                                                <AvatarFallback className="bg-transparent text-primary text-2xl font-black">
                                                    {author.name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <h2 className="text-xl font-bold mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all truncate w-full px-2">
                                            {author.name || 'Unknown Author'}
                                        </h2>

                                        <p className="text-muted-foreground/80 text-sm flex items-center gap-1.5 mb-6">
                                            <FileText className="h-3.5 w-3.5" />
                                            {author._count.posts} {author._count.posts === 1 ? 'Story' : 'Stories'} Published
                                        </p>

                                        <div className="mt-auto w-full pt-4 border-t border-white/10 flex items-center justify-center text-xs font-semibold text-primary uppercase tracking-widest gap-1 group-hover:text-purple-400 transition-colors">
                                            <span>View Profile</span>
                                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </Fade>
                    ))}
                </div>

                {/* Empty State */}
                {authors.length === 0 && (
                    <Fade>
                        <div className="mt-16 py-32 text-center border border-white/10 rounded-[3rem] glass-panel flex flex-col items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-xl">
                                <Users className="h-8 w-8 text-primary opacity-50" />
                            </div>
                            <p className="text-white text-2xl font-bold mb-2">
                                No authors found
                            </p>
                            <p className="text-muted-foreground max-w-sm mb-8 relative z-10">
                                The community is just getting started. Be the first to join.
                            </p>
                        </div>
                    </Fade>
                )}
            </div>
        </div>
    )
}
