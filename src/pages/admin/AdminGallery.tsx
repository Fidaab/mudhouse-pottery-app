import { useState, useEffect } from 'react'
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '../../lib/db'
import type { DbGalleryItem } from '../../lib/db'
import { Plus, Trash2, Save } from 'lucide-react'

export function AdminGallery() {
  const [items, setItems] = useState<DbGalleryItem[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newItem, setNewItem] = useState({ name: '', image: '🎨', difficulty: 'Easy', category: 'Mugs', description: '' })

  async function loadGallery() {
    try {
      const data = await getGallery()
      setItems(data)
    } catch (err) {
      console.error('Failed to load gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadGallery() }, [])

  async function handleAdd() {
    if (!newItem.name) return
    try {
      const item = await addGalleryItem(newItem)
      setItems(prev => [...prev, item])
      setNewItem({ name: '', image: '🎨', difficulty: 'Easy', category: 'Mugs', description: '' })
      setShowAdd(false)
    } catch (err) {
      console.error('Failed to add item:', err)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteGalleryItem(id)
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  async function handleUpdate(id: string, field: string, value: string) {
    try {
      await updateGalleryItem(id, { [field]: value })
      setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i))
    } catch (err) {
      console.error('Failed to update item:', err)
    }
  }

  if (loading) return <p className="text-muted">Loading gallery...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p className="text-muted">{items.length} pieces in gallery</p>
        <button onClick={() => setShowAdd(!showAdd)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 14px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={16} /> Add Piece
        </button>
      </div>

      {showAdd && (
        <div className="card" style={{ border: '2px solid var(--accent)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--accent)' }}>Add New Piece</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Floral Mug" />
          </div>
          <div className="form-group">
            <label>Emoji Icon</label>
            <input type="text" value={newItem.image} onChange={e => setNewItem(p => ({ ...p, image: e.target.value }))} placeholder="🎨" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Category</label>
              <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}>
                <option>Mugs</option><option>Plates</option><option>Bowls</option><option>Vases</option><option>Figurines</option><option>Planters</option>
              </select>
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select value={newItem.difficulty} onChange={e => setNewItem(p => ({ ...p, difficulty: e.target.value }))}>
                <option>Easy</option><option>Medium</option><option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={newItem.description} onChange={e => setNewItem(p => ({ ...p, description: e.target.value }))} placeholder="Brief description" />
          </div>
          <button className="btn btn-accent" onClick={handleAdd}>Add to Gallery</button>
        </div>
      )}

      {items.map(item => (
        <div key={item.id} className="card" style={{ padding: '12px 16px' }}>
          {editing === item.id ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '8px', marginBottom: '8px' }}>
                <input type="text" value={item.image} onChange={e => handleUpdate(item.id, 'image', e.target.value)} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '20px', textAlign: 'center' }} />
                <input type="text" value={item.name} onChange={e => handleUpdate(item.id, 'name', e.target.value)} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }} />
              </div>
              <input type="text" value={item.description || ''} onChange={e => handleUpdate(item.id, 'description', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', marginBottom: '8px' }} />
              <button onClick={() => setEditing(null)} style={{ padding: '6px 12px', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <Save size={12} /> Done
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{item.image}</span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '14px' }}>{item.name}</strong>
                <p className="text-muted" style={{ fontSize: '12px' }}>{item.category} | {item.difficulty}</p>
              </div>
              <button onClick={() => setEditing(item.id)} style={{ padding: '6px 10px', border: '1px solid var(--border)', background: 'white', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 8px', border: 'none', background: 'var(--accent-light)', borderRadius: '6px', cursor: 'pointer', color: 'var(--danger)' }}><Trash2 size={14} /></button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
