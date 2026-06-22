import { supabase } from './supabase'

// Types matching our database
export interface DbPiece {
  id: string
  name: string
  image: string
  customer_name: string
  customer_phone: string | null
  customer_email: string | null
  status: 'painting' | 'drying' | 'glazing' | 'firing' | 'ready' | 'picked-up'
  dropped_off: string
  estimated_ready: string | null
  location: 'issaquah' | 'bothell'
  order_code: string
  created_at: string
}

export interface DbGalleryItem {
  id: string
  name: string
  image: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  category: string
  description: string | null
  active: boolean
  created_at: string
}

export interface DbStoreHours {
  id: string
  location: 'issaquah' | 'bothell'
  day_of_week: string
  open_time: string | null
  close_time: string | null
  is_closed: boolean
}

export interface DbNote {
  id: string
  text: string
  author: string
  pinned: boolean
  location: 'issaquah' | 'bothell' | 'both'
  created_at: string
}

export interface DbBooking {
  id: string
  customer_name: string
  customer_contact: string | null
  booking_type: 'walkin' | 'party'
  party_package: string | null
  guest_count: number
  slot_date: string
  slot_time: string
  location: 'issaquah' | 'bothell'
  status: 'confirmed' | 'cancelled' | 'completed'
  notes: string | null
  created_at: string
}

export interface DbInventoryItem {
  id: string
  name: string
  stock: number
  reorder_at: number
  unit: string
  location: 'issaquah' | 'bothell'
}

// --- PIECES ---
export async function getPieces(location?: string) {
  let query = supabase.from('pieces').select('*').order('created_at', { ascending: false })
  if (location) query = query.eq('location', location)
  const { data, error } = await query
  if (error) throw error
  return data as DbPiece[]
}

export async function searchPieces(searchTerm: string) {
  const term = searchTerm.trim()
  const { data, error } = await supabase
    .from('pieces')
    .select('*')
    .or(`order_code.ilike.%${term}%,customer_phone.ilike.%${term}%`)
  if (error) throw error
  return data as DbPiece[]
}

export async function updatePieceStatus(id: string, status: DbPiece['status']) {
  const { error } = await supabase.from('pieces').update({ status }).eq('id', id)
  if (error) throw error
}

export async function addPiece(piece: Omit<DbPiece, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('pieces').insert(piece).select().single()
  if (error) throw error
  return data as DbPiece
}

// --- GALLERY ---
export async function getGallery() {
  const { data, error } = await supabase.from('gallery').select('*').eq('active', true).order('created_at')
  if (error) throw error
  return data as DbGalleryItem[]
}

export async function addGalleryItem(item: { name: string; image: string; difficulty: string; category: string; description: string }) {
  const { data, error } = await supabase.from('gallery').insert(item).select().single()
  if (error) throw error
  return data as DbGalleryItem
}

export async function updateGalleryItem(id: string, updates: Partial<DbGalleryItem>) {
  const { error } = await supabase.from('gallery').update(updates).eq('id', id)
  if (error) throw error
}

export async function deleteGalleryItem(id: string) {
  const { error } = await supabase.from('gallery').update({ active: false }).eq('id', id)
  if (error) throw error
}

// --- STORE HOURS ---
export async function getStoreHours(location: string) {
  const { data, error } = await supabase.from('store_hours').select('*').eq('location', location)
  if (error) throw error
  return data as DbStoreHours[]
}

export async function updateStoreHours(id: string, updates: { open_time?: string | null; close_time?: string | null; is_closed?: boolean }) {
  const { error } = await supabase.from('store_hours').update(updates).eq('id', id)
  if (error) throw error
}

// --- NOTES ---
export async function getNotes(location: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .or(`location.eq.${location},location.eq.both`)
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as DbNote[]
}

export async function addNote(note: { text: string; author: string; location: string }) {
  const { data, error } = await supabase.from('notes').insert(note).select().single()
  if (error) throw error
  return data as DbNote
}

export async function updateNote(id: string, updates: Partial<DbNote>) {
  const { error } = await supabase.from('notes').update(updates).eq('id', id)
  if (error) throw error
}

export async function deleteNote(id: string) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
}

// --- BOOKINGS ---
export async function createBooking(booking: Omit<DbBooking, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase.from('bookings').insert(booking).select().single()
  if (error) throw error
  return data as DbBooking
}

export async function getBookings(location: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('location', location)
    .order('slot_date', { ascending: true })
  if (error) throw error
  return data as DbBooking[]
}

// --- INVENTORY ---
export async function getInventory(location: string) {
  const { data, error } = await supabase.from('inventory').select('*').eq('location', location).order('name')
  if (error) throw error
  return data as DbInventoryItem[]
}

export async function updateInventoryStock(id: string, stock: number) {
  const { error } = await supabase.from('inventory').update({ stock }).eq('id', id)
  if (error) throw error
}
