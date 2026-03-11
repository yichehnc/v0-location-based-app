'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        placeholder="Search places..."
        className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
      />
    </div>
  )
}
