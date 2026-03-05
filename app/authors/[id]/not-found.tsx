'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, UserX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full h-full pb-32 pt-8 flex items-center justify-center min-h-[70vh]">
      {/* Background glow */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-red-600/10 to-transparent opacity-50 pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full text-center glass-panel border border-white/10 rounded-[3rem] p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center"
      >
        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-xl border border-white/10">
          <UserX className="h-8 w-8 text-red-400 opacity-80" />
        </div>

        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
          User Not Found
        </h2>

        <p className="text-muted-foreground/80 leading-relaxed mb-8">
          The author you&apos;re looking for doesn&apos;t exist or their account may have been removed.
        </p>

        <Link href="/authors" className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <button className="relative w-full px-6 py-3 rounded-full bg-[#0a0a0f] text-white font-bold hover:bg-white/5 transition-colors border border-white/10 flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Authors
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
