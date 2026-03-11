'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Trash2, ExternalLink } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface SavedPlaceData {
  id: string
  place_id: string
  notes: string
  created_at: string
  places: {
    id: string
    name: string
    description: string
    address: string
    latitude: number
    longitude: number
    tags: string[]
  }
}

export default function SavedPlacesPage() {
  const [savedPlaces, setSavedPlaces] = useState<SavedPlaceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const fetchSavedPlaces = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('saved_places')
        .select('id, place_id, notes, created_at, places(id, name, description, address, latitude, longitude, tags)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) {
        setSavedPlaces(data || [])
      }
      setIsLoading(false)
    }

    fetchSavedPlaces()
  }, [user, router])

  const removeSavedPlace = async (id: string) => {
    const supabase = createClient()
    await supabase.from('saved_places').delete().eq('id', id)
    setSavedPlaces(prev => prev.filter(p => p.id !== id))
  }

  const openInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    window.open(url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading your saved places...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-8 h-8 text-primary" />
            My Saved Places
          </h1>
          <p className="text-muted-foreground">
            {savedPlaces.length === 0
              ? 'No saved places yet. Explore and save your favorite quiet spaces!'
              : `You have ${savedPlaces.length} saved place${savedPlaces.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {savedPlaces.length === 0 ? (
          <Card className="p-8 text-center bg-card">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">Start exploring and save your favorite quiet spaces!</p>
            <Button asChild className="mt-4">
              <a href="/">Explore Places</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedPlaces.map(saved => (
              <Card key={saved.id} className="p-4 bg-card hover:border-primary transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-foreground">{saved.places.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {saved.places.address}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSavedPlace(saved.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{saved.places.description}</p>

                {saved.places.tags && saved.places.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {saved.places.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {saved.notes && (
                  <div className="bg-secondary/50 p-3 rounded mb-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Note: </span>
                      {saved.notes}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      openInMaps(saved.places.latitude, saved.places.longitude)
                    }
                    className="gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Directions
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={`/?place=${saved.place_id}`}>View on Map</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
