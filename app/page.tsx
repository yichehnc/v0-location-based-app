'use client'

import { useState, useEffect } from 'react'
import { MapView } from '@/components/map-view'
import { PlacesList } from '@/components/places-list'
import { PlaceDetails } from '@/components/place-details'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { Menu, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [view, setView] = useState<'map' | 'list'>('map')
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState('')

  useEffect(() => {
    // Close sidebar on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
          <p className="text-muted-foreground mb-8">
            Discover peaceful green spaces in your city. Sign in to get started.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="/auth/login">Sign In</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="/auth/sign-up">Create Account</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Pause
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-0 md:inset-auto w-80 max-w-full bg-card border-r flex flex-col z-50 transform transition-transform md:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="hidden md:flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Pause
          </h1>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex items-center gap-2 p-4 border-b">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href="/saved" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Saved
            </Link>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <SearchBar 
              onSearch={setSearchQuery}
              onFilterByTag={setFilterTag}
            />
            {selectedPlace ? (
              <PlaceDetails
                placeId={selectedPlace}
                onClose={() => setSelectedPlace(null)}
              />
            ) : (
              <PlacesList 
                onSelectPlace={setSelectedPlace}
                searchQuery={searchQuery}
                filterTag={filterTag}
              />
            )}
          </div>
        </div>

        {/* Close button on mobile */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </div>

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MapView selectedPlace={selectedPlace} />
      </div>
    </div>
  )
}
