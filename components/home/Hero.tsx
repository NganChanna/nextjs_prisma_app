"use client";

import { motion } from "framer-motion";
import { Search } from "@/components/home/Search";

export function Hero() {
    return (
        <div className="relative isolate pt-24 pb-16 text-center overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl px-4 sm:px-6 w-full"
            >
                <div className="relative inline-block mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/20 mb-6"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold text-white/80">Superblog 2.0 is now live</span>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 block">
                            Discover
                        </span>
                        <div className="relative inline-block mt-2 mb-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 blur-0 relative z-10 block">
                                Extraordinary
                            </span>
                            <span className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 blur-2xl opacity-60 -z-10 select-none block">
                                Extraordinary
                            </span>
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40 block mt-2">
                            Stories
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-muted-foreground font-medium mb-12 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    Immerse yourself in a world of premium content. Share your thoughts in a beautifully crafted glassmorphic space.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="w-full max-w-xl mx-auto relative z-20"
                >
                    <Search />
                </motion.div>
            </motion.div>
        </div>
    );
}
