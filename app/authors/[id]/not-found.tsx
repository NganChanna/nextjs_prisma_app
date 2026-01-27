'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full text-center bg-white border border-gray-200 rounded-3xl p-10 shadow-xl"
      >
        {/* Icon / Accent */}
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-black">
          !
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900">
          Post Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed">
          The article you’re looking for doesn’t exist or may have been removed.
        </p>

        <div className="mt-8">
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold transition hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            ← Return to Feed
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
