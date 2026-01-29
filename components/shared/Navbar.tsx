'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ToggleTheme'
import { useSession, signOut } from '@/lib/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LogOut, User, LayoutDashboard, PlusCircle, BookOpen, Settings } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  const isActive = (path: string) => pathname === path

  const userInitial = session?.user?.name 
    ? session.user.name.charAt(0).toUpperCase() 
    : session?.user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-foreground hover:opacity-70 transition-all flex items-center gap-1"
        >
          Superblog<span className="text-blue-600">.</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ModeToggle />

          <Link 
            href="/posts" 
            className="hidden md:flex text-sm font-bold text-muted-foreground hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Read
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/posts/new" 
                className="hidden md:flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
              >
                Write
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-blue-600/10 hover:bg-blue-600/20 p-0 overflow-hidden border border-blue-600/20">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-lg">{userInitial}</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/authors/${session.user.id}`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/posts/new" className="cursor-pointer md:hidden">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>New Post</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/posts" className="cursor-pointer md:hidden">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Read Feed</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={async () => {
                      await signOut()
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            !isPending && (
              <Link 
                href="/signin" 
                className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-bold transition-all hover:opacity-90"
              >
                Sign in
              </Link>
            )
          )}
        </div>

      </div>
    </nav>
  )
}