import { useState } from 'react'
import type { Location } from '../../data/store'
import { Plus, Trash2, Pin } from 'lucide-react'

interface Note {
  id: string
  text: string
  author: string
  createdAt: string
  pinned: boolean
  location: Location | 'both'
}

interface AdminNotesProps {
  location: Location
}

export function AdminNotes({ location }: AdminNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', text: 'Kiln #2 needs element replacement next week. Order parts by Thursday.', author: 'Shannon', createdAt: '2026-06-20', pinned: true, location: 'issaquah' },
    { id: '2', text: 'New glaze colors arrived (ocean blue, sunset orange). Unpack and label by Saturday.', author: 'Staff', createdAt: '2026-06-21', pinned: false, location: 'both' },
    { id: '3', text: 'Summer camp flyers need to be restocked at front counter.', author: 'Shannon', createdAt: '2026-06-19', pinned: false, location: 'bothell' },
  ])
  const [newNote, setNewNote] = useState('')
  const [noteScope, setNoteScope] = useState<'both' | Location>(location)

  const filteredNotes = notes
    .filter(n => n.location === 'both' || n.location === location)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return b.createdAt.localeCompare(a.createdAt)
    })

  function addNote() {
    if (!newNote.trim()) return
    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      author: 'Staff',
      createdAt: new Date().toISOString().split('T')[0],
      pinned: false,
      location: noteScope,
    }
    setNotes(prev => [note, ...prev])
    setNewNote('')
  }

  function deleteNote(id: string) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  function togglePin(id: string) {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  }

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  return (
    <div>
      <p className="text-muted mb-8">Internal notes for {locationName} staff. Not visible to customers.</p>

      {/* Add note */}
      <div className="card" style={{ border: '1px solid var(--primary)', background: 'var(--primary-light)' }}>
        <textarea
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          placeholder="Add a note for the team..."
          rows={3}
          style={{
            width: '100%', padding: '12px', border: '1px solid var(--border)',
            borderRadius: '8px', fontSize: '14px', fontFamily: 'Open Sans, sans-serif',
            resize: 'vertical', marginBottom: '8px', background: 'white',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={noteScope}
            onChange={e => setNoteScope(e.target.value as 'both' | Location)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', background: 'white' }}
          >
            <option value={location}>{locationName} only</option>
            <option value="both">Both locations</option>
          </select>
          <button
            onClick={addNote}
            style={{
              marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px',
              padding: '8px 16px', borderRadius: '8px', border: 'none',
              background: 'var(--primary)', color: 'white', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Plus size={14} /> Add Note
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="mt-16">
        {filteredNotes.length === 0 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <p className="text-muted">No notes yet. Add one above.</p>
          </div>
        )}
        {filteredNotes.map(note => (
          <div key={note.id} className="card" style={{ borderLeft: note.pinned ? '3px solid var(--accent)' : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <p style={{ fontSize: '14px', lineHeight: '1.5', flex: 1 }}>{note.text}</p>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <button
                  onClick={() => togglePin(note.id)}
                  title={note.pinned ? 'Unpin' : 'Pin'}
                  style={{
                    padding: '4px', border: 'none', borderRadius: '4px',
                    background: note.pinned ? 'var(--accent-light)' : 'transparent',
                    color: note.pinned ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  <Pin size={14} />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{ padding: '4px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>{note.author}</span>
              <span>|</span>
              <span>{note.createdAt}</span>
              {note.location === 'both' && <span className="badge badge-info" style={{ fontSize: '10px', padding: '2px 6px' }}>Both locations</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
