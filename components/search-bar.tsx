'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  onSearch?: (query: string) => void
  onFilterByTag?: (tag: string) => void
}

const POPULAR_TAGS = ['shade', 'seating', 'water', 'dog-friendly', 'view', 'quiet']

export function SearchBar({ onSearch, onFilterByTag }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showTags, setShowTags] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  const handleTagSelect = (tag: string) => {
    onFilterByTag?.(tag)
    setShowTags(false)
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search places..."
          value={query}
          onChange={handleSearch}
          onFocus={() => setShowTags(true)}
          className="pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showTags && (
        <div className="bg-secondary/50 p-3 rounded space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Filter by amenities
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map(tag => (
              <Button
                key={tag}
                size="sm"
                variant="outline"
                onClick={() => handleTagSelect(tag)}
                className="text-xs h-7 capitalize"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
