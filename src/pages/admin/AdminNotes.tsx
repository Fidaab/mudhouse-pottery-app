import { useState, useEffect } from 'react'
import { getNotes, addNote, updateNote, deleteNote } from '../../lib/db'
import type { DbNote } from '../../lib/db'
import type { Location } from '../../data/store'
import { Plus, Trash2, Pin } from 'lucide-react'

interface AdminNotesProps {
  location: Location
}

export function AdminNotes({ location }: AdminNotesProps) {
  const [notes, setNotes] = useState<DbNote[]>([])
  const [newNoteText, setNewNoteText] = useState('')
  const [noteScope, setNoteScope] = useState<'both' | Location>(location)
  const [loading, setLoading] = useState(true)

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  async function loadNotes() {
    try {
      const data = await getNotes(location)
      setNotes(data)
    } catch (err) {
      console.error('Failed to load notes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadNotes() }, [location])

  async function handleAddNote() {
    if (!newNoteText.trim()) return
    try {
      const note = await addNote({ text: newNoteText.trim(), author: 'Staff', location: noteScope })
      setNotes(prev => [note, ...prev])
      setNewNoteText('')
    } catch (err) {
      console.error('Failed to add note:', err)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNote(id)
      setNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  async function handleTogglePin(id: string, currentPinned: boolean) {
    try {
      await updateNote(id, { pinned: !currentPinned })
      setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !currentPinned } : n))
    } catch (err) {
      console.error('Failed to update note:', err)
    }
  }

  if (loading) return <p className="text-muted">Loading notes...</p>

  return (
    <div>
      <p className="text-muted mb-8">Internal notes for {locationName} staff. Not visible to customers.</p>

      <div className="card" style={{ border: '1px solid var(--primary)', background: 'var(--primary-light)' }}>
        <textarea
          value={newNoteText}
          onChange={e => setNewNoteText(e.target.value)}
          placeholder="Add a note for the team..."
          rows={3}
          style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', fontFamily: 'Open Sans, sans-serif', resize: 'vertical', marginBottom: '8px', background: 'white' }}
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
            onClick={handleAddNote}
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            <Plus size={14} /> Add Note
          </button>
        </div>
      </div>

      <div className="mt-16">
        {notes.length === 0 && <div className="card" style={{ textAlign: 'center' }}><p className="text-muted">No notes yet.</p></div>}
        {notes.map(note => (
          <div key={note.id} className="card" style={{ borderLeft: note.pinned ? '3px solid var(--accent)' : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <p style={{ fontSize: '14px', lineHeight: '1.5', flex: 1 }}>{note.text}</p>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                <button onClick={() => handleTogglePin(note.id, note.pinned)} style={{ padding: '4px', border: 'none', borderRadius: '4px', background: note.pinned ? 'var(--accent-light)' : 'transparent', color: note.pinned ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer' }}>
                  <Pin size={14} />
                </button>
                <button onClick={() => handleDelete(note.id)} style={{ padding: '4px', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>{note.author}</span>
              <span>|</span>
              <span>{note.created_at?.split('T')[0]}</span>
              {note.location === 'both' && <span className="badge badge-info" style={{ fontSize: '10px', padding: '2px 6px' }}>Both locations</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
