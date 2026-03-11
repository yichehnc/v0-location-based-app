'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Leaf, Trees, Droplets, Dog, Heart } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

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
}

interface PlacesListProps {
  onSelectPlace: (id: string) => void
  searchQuery?: string
  filterTag?: string
}

export function PlacesList({ onSelectPlace, searchQuery = '', filterTag = '' }: PlacesListProps) {
  const [places, setPlaces] = useState<Place[]>([])
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      // Fetch all places
      const { data: placesData } = await supabase
        .from('places')
        .select('*')
        .order('name')

      setPlaces(placesData || [])

      // Fetch saved places for user
      if (user) {
        const { data: savedData } = await supabase
          .from('saved_places')
          .select('place_id')
          .eq('user_id', user.id)

        setSavedPlaces(new Set(savedData?.map(s => s.place_id) || []))
      }

      setIsLoading(false)
    }

    fetchData()
  }, [user])

  // Filter places based on search and tag
  useEffect(() => {
    let filtered = places

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query)
      )
    }

    if (filterTag) {
      filtered = filtered.filter(p => p.tags?.includes(filterTag))
    }

    setFilteredPlaces(filtered)
  }, [places, searchQuery, filterTag])

  const toggleSave = async (placeId: string) => {
    if (!user) return

    const supabase = createClient()
    const isSaved = savedPlaces.has(placeId)

    if (isSaved) {
      await supabase
        .from('saved_places')
        .delete()
        .eq('place_id', placeId)
        .eq('user_id', user.id)

      setSavedPlaces(prev => {
        const newSet = new Set(prev)
        newSet.delete(placeId)
        return newSet
      })
    } else {
      await supabase
        .from('saved_places')
        .insert({
          place_id: placeId,
          user_id: user.id,
        })

      setSavedPlaces(prev => new Set([...prev, placeId]))
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity?.toLowerCase()) {
      case 'shade':
        return <Trees className="w-4 h-4" />
      case 'seating':
        return <MapPin className="w-4 h-4" />
      case 'water':
        return <Droplets className="w-4 h-4" />
      case 'dog-friendly':
        return <Dog className="w-4 h-4" />
      default:
        return <Leaf className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading places...</div>
  }

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-foreground flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        Quiet Spaces
      </h2>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredPlaces.length === 0 && (
          <p className="text-center py-8 text-muted-foreground text-sm">
            {searchQuery || filterTag ? 'No places found matching your search.' : 'No places available.'}
          </p>
        )}
        {filteredPlaces.map(place => (
          <Card
            key={place.id}
            className="p-3 cursor-pointer hover:border-primary transition-colors bg-card hover:bg-secondary/50"
            onClick={() => onSelectPlace(place.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm truncate">
                  {place.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {place.description}
                </p>
                {place.tags && place.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {place.tags.slice(0, 3).map((tag, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {getAmenityIcon(tag)}
                        <span className="capitalize">{tag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  toggleSave(place.id)
                }}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <Heart
                  className={`w-4 h-4 ${
                    savedPlaces.has(place.id)
                      ? 'fill-destructive text-destructive'
                      : 'text-muted-foreground'
                  }`}
                />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
