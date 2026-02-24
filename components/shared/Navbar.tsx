'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { LogOut, User, PlusCircle, BookOpen, Settings, LayoutDashboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4 sm:px-6 transition-all duration-300">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-full max-w-5xl rounded-full transition-all duration-500 flex items-center justify-between px-2 sm:px-4 py-2 ${scrolled
            ? "bg-[#0a0a0f]/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border border-transparent"
          }`}
      >
        <Link
          href="/"
          className="ml-2 flex items-center gap-1 group"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-foreground transition-all">
            Superblog
          </span>
          <span className="text-primary text-xl sm:text-2xl font-black transition-all group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {[
              { name: 'Feed', path: '/posts' },
              { name: 'Authors', path: '/authors' },
            ].map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative px-4 py-2 text-sm font-semibold transition-colors"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-muted-foreground hover:text-white'}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/posts/new"
                className="hidden md:flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-purple-500 px-5 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_-5px_var(--color-primary)] active:scale-95 border border-white/10"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all bg-black/20 group">
                    <span className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {session.user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="h-full w-full object-cover relative z-10"
                      />
                    ) : (
                      <span className="text-primary font-bold text-lg relative z-10">{userInitial}</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 p-2 glass-panel border-white/10 rounded-2xl shadow-2xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal px-2 py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10 mx-2" />
                  <div className="p-1">
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                      <Link href={`/authors/${session.user.id}`}>
                        <User className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                      <Link href="/settings">
                        <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    {/* Mobile Only Menu Items */}
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors md:hidden">
                      <Link href="/posts/new">
                        <PlusCircle className="mr-3 h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">New Post</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors md:hidden">
                      <Link href="/posts">
                        <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Read Feed</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10 mx-2" />
                  <div className="p-1">
                    <DropdownMenuItem
                      className="rounded-xl text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer transition-colors"
                      onClick={async () => {
                        await signOut()
                      }}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            !isPending && (
              <div className="flex gap-2 items-center">
                <Link
                  href="/signin"
                  className="rounded-full px-4 sm:px-6 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-white text-black px-4 sm:px-6 py-2 text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] active:scale-95"
                >
                  Get started
                </Link>
              </div>
            )
          )}
        </div>
      </motion.nav>
    </div>
  )
}