'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type L from 'leaflet'

interface Place {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  tags: string[]
}

export function MapView({ selectedPlace }: { selectedPlace: string | null }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const markersRef = useRef<L.Marker[]>([])
  const [leaflet, setLeaflet] = useState<typeof L | null>(null)

  // Load Leaflet dynamically (client-side only)
  useEffect(() => {
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css')
      setLeaflet(L.default)
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || !leaflet) return

    map.current = leaflet.map(mapContainer.current).setView([-37.8136, 144.9631], 12)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      tileSize: 256,
    }).addTo(map.current)

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [leaflet])

  // Fetch places from Supabase
  useEffect(() => {
    const fetchPlaces = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching places:', error)
        return
      }

      setPlaces(data || [])
    }

    fetchPlaces()
  }, [])

  // Add markers to map
  useEffect(() => {
    if (!map.current || !leaflet) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    places.forEach(place => {
      const marker = leaflet.marker([place.latitude, place.longitude], {
        icon: leaflet.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
        .bindPopup(`<div class="text-sm"><strong>${place.name}</strong><br/>${place.description}</div>`)
        .addTo(map.current!)

      markersRef.current.push(marker)

      marker.on('click', () => {
        // Trigger selection from parent
        window.dispatchEvent(new CustomEvent('place-selected', { detail: place.id }))
      })
    })
  }, [places, leaflet])

  // Highlight selected place
  useEffect(() => {
    if (!map.current || !selectedPlace) return

    const place = places.find(p => p.id === selectedPlace)
    if (place) {
      map.current.setView([place.latitude, place.longitude], 15, {
        animate: true,
        duration: 0.5,
      })

      // Open popup for selected marker
      const selectedMarker = markersRef.current[places.indexOf(place)]
      if (selectedMarker) {
        selectedMarker.openPopup()
      }
    }
  }, [selectedPlace, places])

  if (!leaflet) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full bg-muted" />
}
