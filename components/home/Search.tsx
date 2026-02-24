"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { SearchIcon, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { searchAuthors } from "@/lib/actions/feed.action";
import { motion, AnimatePresence } from "framer-motion";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setQuery(term);
    startTransition(async () => {
      if (term.length > 1) {
        const authors = await searchAuthors(term);
        setResults(authors);
      } else {
        setResults([]);
      }
    });
  };

  return (
    <div className="w-full relative group" ref={containerRef}>
      {/* Outer Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 ${isFocused ? 'opacity-60 duration-200' : ''}`}></div>

      <div className="relative flex items-center bg-[#0a0a0f]/80 backdrop-blur-xl rounded-full border border-white/10 px-4 py-2 shadow-2xl transition-all">
        <SearchIcon className={`h-5 w-5 ml-2 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        <input
          placeholder="Search for authors..."
          className="w-full bg-transparent border-none text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 px-4 py-3 text-base sm:text-lg"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {isPending && (
          <div className="mr-2 h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        )}
      </div>

      <AnimatePresence>
        {(isFocused && query.length > 1) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 z-50 glass-card rounded-3xl p-2 overflow-hidden border border-white/10"
          >
            {results.length > 0 ? (
              <div className="flex flex-col gap-1 max-h-[350px] overflow-y-auto">
                {results.map((author, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={author.id}
                  >
                    <Link
                      href={`/authors/${author.id}`}
                      onClick={() => setIsFocused(false)}
                      className="flex items-center justify-between p-3 sm:p-4 hover:bg-white/5 rounded-2xl transition-colors group/item"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-white/5 flex items-center justify-center overflow-hidden">
                          {author.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={author.image} alt={author.name} className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-base font-bold text-white group-hover/item:text-primary transition-colors">{author.name}</p>
                          <p className="text-sm text-muted-foreground group-hover/item:text-white/60 transition-colors">{author._count?.posts || 0} posts</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              !isPending && (
                <div className="p-10 text-center flex flex-col items-center justify-center text-muted-foreground">
                  <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <SearchIcon className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-base font-bold text-white mb-1">No authors found</p>
                  <p className="text-sm opacity-80">Try modifying your search term.</p>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
