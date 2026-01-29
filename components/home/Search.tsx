"use client";

import { useState, useTransition } from "react";
import { SearchIcon, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { searchAuthors } from "@/lib/actions/feed.action";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

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
    <div className="w-full max-w-md mx-auto mb-8 relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search authors..."
          className="pl-10"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      
      {query.length > 1 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-2">
            {isPending ? (
              <p className="text-center text-sm text-muted-foreground p-2">Searching...</p>
            ) : results.length > 0 ? (
              <div className="flex flex-col gap-1">
                {results.map((author) => (
                  <Link
                    key={author.id}
                    href={`/authors/${author.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author._count.posts} posts</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground p-2">No authors found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
