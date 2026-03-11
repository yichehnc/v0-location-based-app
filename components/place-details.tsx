'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, ArrowLeft, ExternalLink, Trash2, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface Place {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  tags: string[]
  amenities: string[]
}

interface Note {
  id: string
  content: string
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
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

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

      // Fetch notes if user exists
      if (user) {
        const { data: notesData } = await supabase
          .from('saved_places')
          .select('notes')
          .eq('place_id', placeId)
          .eq('user_id', user.id)
          .single()

        if (notesData?.notes) {
          setNotes(notesData.notes)
        }
      }

      setIsLoading(false)
    }

    fetchPlace()
  }, [placeId, user])

  const addNote = async () => {
    if (!newNote.trim() || !user) return

    const note = {
      id: Date.now().toString(),
      content: newNote,
      created_at: new Date().toISOString(),
    }

    const supabase = createClient()

    // Update notes in saved_places
    const updatedNotes = [...notes, note]
    await supabase
      .from('saved_places')
      .update({ notes: updatedNotes })
      .eq('place_id', placeId)
      .eq('user_id', user.id)

    setNotes(updatedNotes)
    setNewNote('')
  }

  const deleteNote = async (noteId: string) => {
    if (!user) return

    const supabase = createClient()
    const updatedNotes = notes.filter(n => n.id !== noteId)

    await supabase
      .from('saved_places')
      .update({ notes: updatedNotes })
      .eq('place_id', placeId)
      .eq('user_id', user.id)

    setNotes(updatedNotes)
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
          <h2 className="text-xl font-bold text-foreground mb-2">{place.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{place.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {place.amenities?.map((amenity, i) => (
              <span
                key={i}
                className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize"
              >
                {amenity}
              </span>
            ))}
          </div>

          <Button
            onClick={openInGoogleMaps}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Maps
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            My Notes
          </h3>

          <div className="space-y-2 mb-4">
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notes yet. Add one below!</p>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  className="bg-secondary/50 p-3 rounded text-sm text-foreground flex items-start justify-between gap-2"
                >
                  <div className="flex-1">
                    <p>{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                    className="h-8 w-8 p-0 flex-shrink-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Add a note about this place..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              className="resize-none h-20"
            />
            <Button
              onClick={addNote}
              disabled={!newNote.trim()}
              className="self-end bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
