'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, ArrowLeft, ExternalLink, Trash2, Plus } from 'lucide-react'
interface Place {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  tags: string[]
  category: string
  address: string
}

interface SavedPlace {
  id: string
  place_id: string
  notes: string
  created_at: string
}

export function PlaceDetails({
  placeId,
  onClose,
}: {
  placeId: string
  onClose: () => void
}) {
  const [place, setPlace] = useState<Place | null>(null)
  const [savedPlace, setSavedPlace] = useState<SavedPlace | null>(null)
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchPlace = async () => {
      const supabase = createClient()

      // Fetch place details
      const { data: placeData } = await supabase
        .from('places')
        .select('*')
        .eq('id', placeId)
        .single()

      setPlace(placeData)
      setIsLoading(false)
    }

    fetchPlace()
  }, [placeId])

  const savePlace = async () => {
    if (!place) return
    setIsSaved(true)
  }

  const updateNotes = async () => {
    // Notes are updated locally in component state
  }

  const unsavePlace = async () => {
    setSavedPlace(null)
    setNotes('')
    setIsSaved(false)
  }

  const openInGoogleMaps = () => {
    if (!place) return
    const url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`
    window.open(url, '_blank')
  }

  if (isLoading || !place) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onClose} className="w-full justify-start">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to List
      </Button>

      <Card className="p-4 bg-card space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">{place.name}</h2>
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {place.address}
          </p>
          <p className="text-sm text-muted-foreground mb-4">{place.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {place.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <Button
              onClick={openInGoogleMaps}
              className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <ExternalLink className="w-4 h-4" />
              Directions in Maps
            </Button>

            {!isSaved ? (
              <Button
                onClick={savePlace}
                variant="outline"
                className="w-full"
              >
                Save This Place
              </Button>
            ) : (
              <Button
                onClick={unsavePlace}
                variant="destructive"
                className="w-full"
              >
                Remove from Saved
              </Button>
            )}
          </div>
        </div>

        {isSaved && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-foreground mb-3">My Notes</h3>

            <div className="mb-4">
              <Textarea
                placeholder="Add notes about this place..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="resize-none h-24 mb-2"
              />
              <Button
                onClick={updateNotes}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                Save Notes
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
