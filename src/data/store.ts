export type Location = 'issaquah' | 'bothell'

export interface TimeSlot {
  id: string
  date: string
  time: string
  spotsAvailable: number
  maxSpots: number
  location: 'issaquah' | 'bothell'
}

export interface GalleryItem {
  id: string
  name: string
  image: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  category: string
  description: string
}

export interface PieceStatus {
  id: string
  name: string
  image: string
  customerName: string
  customerPhone: string
  status: 'painting' | 'drying' | 'glazing' | 'firing' | 'ready' | 'picked-up'
  droppedOff: string
  estimatedReady: string
  location: 'issaquah' | 'bothell'
  orderCode: string
}

export interface InventoryItem {
  id: string
  name: string
  stock: number
  reorderAt: number
  unit: string
  location: 'issaquah' | 'bothell'
}

export const timeSlots: TimeSlot[] = [
  { id: '1', date: '2026-06-23', time: '10:00 AM', spotsAvailable: 6, maxSpots: 8, location: 'issaquah' },
  { id: '2', date: '2026-06-23', time: '1:00 PM', spotsAvailable: 3, maxSpots: 8, location: 'issaquah' },
  { id: '3', date: '2026-06-23', time: '4:00 PM', spotsAvailable: 8, maxSpots: 8, location: 'issaquah' },
  { id: '4', date: '2026-06-24', time: '10:00 AM', spotsAvailable: 5, maxSpots: 8, location: 'issaquah' },
  { id: '5', date: '2026-06-24', time: '1:00 PM', spotsAvailable: 0, maxSpots: 8, location: 'issaquah' },
  { id: '6', date: '2026-06-23', time: '10:00 AM', spotsAvailable: 4, maxSpots: 8, location: 'bothell' },
  { id: '7', date: '2026-06-23', time: '1:00 PM', spotsAvailable: 7, maxSpots: 8, location: 'bothell' },
  { id: '8', date: '2026-06-23', time: '4:00 PM', spotsAvailable: 2, maxSpots: 8, location: 'bothell' },
  { id: '9', date: '2026-06-24', time: '10:00 AM', spotsAvailable: 6, maxSpots: 8, location: 'bothell' },
  { id: '10', date: '2026-06-24', time: '1:00 PM', spotsAvailable: 1, maxSpots: 8, location: 'bothell' },
]

export const galleryItems: GalleryItem[] = [
  { id: '1', name: 'Classic Mug', image: '☕', difficulty: 'Easy', category: 'Mugs', description: 'A simple mug with your own pattern' },
  { id: '2', name: 'Floral Plate', image: '🌸', difficulty: 'Medium', category: 'Plates', description: 'Delicate flower pattern on a dinner plate' },
  { id: '3', name: 'Animal Figurine', image: '🐱', difficulty: 'Advanced', category: 'Figurines', description: 'Detailed cat figurine with fine brushwork' },
  { id: '4', name: 'Heart Bowl', image: '💜', difficulty: 'Easy', category: 'Bowls', description: 'Heart-shaped trinket bowl' },
  { id: '5', name: 'Galaxy Vase', image: '🌌', difficulty: 'Advanced', category: 'Vases', description: 'Deep space swirl effect on a tall vase' },
  { id: '6', name: 'Polka Dot Cup', image: '🔵', difficulty: 'Easy', category: 'Mugs', description: 'Fun polka dot pattern on a teacup' },
  { id: '7', name: 'Mandala Plate', image: '🎨', difficulty: 'Advanced', category: 'Plates', description: 'Intricate mandala design' },
  { id: '8', name: 'Simple Bowl', image: '🥣', difficulty: 'Easy', category: 'Bowls', description: 'Solid color dip bowl' },
  { id: '9', name: 'Succulent Planter', image: '🪴', difficulty: 'Medium', category: 'Planters', description: 'Small planter with leaf motif' },
  { id: '10', name: 'Pet Portrait Mug', image: '🐶', difficulty: 'Medium', category: 'Mugs', description: 'Paint your pet on a mug' },
  { id: '11', name: 'Rainbow Plate', image: '🌈', difficulty: 'Easy', category: 'Plates', description: 'Colorful rainbow stripe pattern' },
  { id: '12', name: 'Owl Figurine', image: '🦉', difficulty: 'Medium', category: 'Figurines', description: 'Cute owl with textured feathers' },
]

export const pieces: PieceStatus[] = [
  { id: '1', name: 'Galaxy Vase', image: '🌌', customerName: 'Sarah M.', customerPhone: '425-555-0101', status: 'firing', droppedOff: '2026-06-19', estimatedReady: '2026-06-25', location: 'issaquah', orderCode: 'MH-ISS-001' },
  { id: '2', name: 'Classic Mug', image: '☕', customerName: 'Sarah M.', customerPhone: '425-555-0101', status: 'ready', droppedOff: '2026-06-16', estimatedReady: '2026-06-23', location: 'issaquah', orderCode: 'MH-ISS-002' },
  { id: '3', name: 'Floral Plate', image: '🌸', customerName: 'Jake T.', customerPhone: '425-555-0202', status: 'glazing', droppedOff: '2026-06-20', estimatedReady: '2026-06-26', location: 'issaquah', orderCode: 'MH-ISS-003' },
  { id: '4', name: 'Heart Bowl', image: '💜', customerName: 'Lisa K.', customerPhone: '425-555-0303', status: 'drying', droppedOff: '2026-06-22', estimatedReady: '2026-06-27', location: 'bothell', orderCode: 'MH-BOT-001' },
  { id: '5', name: 'Polka Dot Cup', image: '🔵', customerName: 'Mike R.', customerPhone: '425-555-0404', status: 'painting', droppedOff: '2026-06-22', estimatedReady: '2026-06-30', location: 'bothell', orderCode: 'MH-BOT-002' },
  { id: '6', name: 'Mandala Plate', image: '🎨', customerName: 'Anna W.', customerPhone: '425-555-0505', status: 'firing', droppedOff: '2026-06-20', estimatedReady: '2026-06-25', location: 'bothell', orderCode: 'MH-BOT-003' },
]

export const inventory: InventoryItem[] = [
  { id: '1', name: 'Mugs (small)', stock: 24, reorderAt: 10, unit: 'pcs', location: 'issaquah' },
  { id: '2', name: 'Mugs (large)', stock: 8, reorderAt: 10, unit: 'pcs', location: 'issaquah' },
  { id: '3', name: 'Plates (dinner)', stock: 15, reorderAt: 8, unit: 'pcs', location: 'issaquah' },
  { id: '4', name: 'Bowls', stock: 18, reorderAt: 10, unit: 'pcs', location: 'issaquah' },
  { id: '5', name: 'Figurines', stock: 6, reorderAt: 5, unit: 'pcs', location: 'issaquah' },
  { id: '6', name: 'Red paint', stock: 3, reorderAt: 5, unit: 'bottles', location: 'issaquah' },
  { id: '7', name: 'Blue paint', stock: 7, reorderAt: 5, unit: 'bottles', location: 'issaquah' },
  { id: '8', name: 'Clear glaze', stock: 2, reorderAt: 4, unit: 'liters', location: 'issaquah' },
  { id: '9', name: 'Mugs (small)', stock: 20, reorderAt: 10, unit: 'pcs', location: 'bothell' },
  { id: '10', name: 'Mugs (large)', stock: 12, reorderAt: 10, unit: 'pcs', location: 'bothell' },
  { id: '11', name: 'Plates (dinner)', stock: 9, reorderAt: 8, unit: 'pcs', location: 'bothell' },
  { id: '12', name: 'Bowls', stock: 14, reorderAt: 10, unit: 'pcs', location: 'bothell' },
  { id: '13', name: 'Figurines', stock: 4, reorderAt: 5, unit: 'pcs', location: 'bothell' },
  { id: '14', name: 'Red paint', stock: 6, reorderAt: 5, unit: 'bottles', location: 'bothell' },
  { id: '15', name: 'Blue paint', stock: 2, reorderAt: 5, unit: 'bottles', location: 'bothell' },
  { id: '16', name: 'Clear glaze', stock: 5, reorderAt: 4, unit: 'liters', location: 'bothell' },
]

export const partyPackages = [
  { id: 'kids', name: "Kids' Painting Party", icon: '🎂', description: 'Perfect for birthdays! Up to 12 kids, 2 hours, piece + paints included', price: '$25/child' },
  { id: 'adult', name: 'Adult Events and Parties', icon: '🥂', description: 'Showers, girls night, celebrations. Up to 20 guests, BYOB welcome', price: '$30/person' },
  { id: 'team', name: 'Corporate Team Building', icon: '🏢', description: 'Up to 30 guests, 2.5 hours, facilitated creative session', price: '$35/person' },
  { id: 'camp', name: 'Summer Camp', icon: '☀️', description: 'Weekly sessions, ages 6 to 12. Half-day and full-day options', price: '$195/week' },
]

export function getStatusLabel(status: PieceStatus['status']): string {
  const labels: Record<PieceStatus['status'], string> = {
    painting: 'In Studio',
    drying: 'Drying',
    glazing: 'Being Glazed',
    firing: 'In the Kiln',
    ready: 'Ready for Pickup!',
    'picked-up': 'Picked Up',
  }
  return labels[status]
}

export function getStatusColor(status: PieceStatus['status']): string {
  const colors: Record<PieceStatus['status'], string> = {
    painting: 'badge-info',
    drying: 'badge-warning',
    glazing: 'badge-warning',
    firing: 'badge-warning',
    ready: 'badge-success',
    'picked-up': 'badge-neutral',
  }
  return colors[status]
}
