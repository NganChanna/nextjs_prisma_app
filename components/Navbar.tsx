'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-gray-900 hover:opacity-70 transition-all flex items-center gap-1"
        >
          Superblog<span className="text-blue-600">.</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            href="/posts" 
            className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Read
          </Link>
          <Link 
            href="/posts/new" 
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
          >
            Write
          </Link>
        </div>
      </div>
    </nav>
  )
}
