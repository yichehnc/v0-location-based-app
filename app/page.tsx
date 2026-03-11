'use client'

import { useState, useEffect } from 'react'
import { MapView } from '@/components/map-view'
import { PlacesList } from '@/components/places-list'
import { PlaceDetails } from '@/components/place-details'
import { SearchBar } from '@/components/search-bar'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Menu, MapPin } from 'lucide-react'

export default function Home() {
  const [view, setView] = useState<'map' | 'list'>('map')
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useAuth()

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

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto text-primary mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Pause</h1>
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
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <SearchBar />
            {selectedPlace ? (
              <PlaceDetails
                placeId={selectedPlace}
                onClose={() => setSelectedPlace(null)}
              />
            ) : (
              <PlacesList onSelectPlace={setSelectedPlace} />
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
