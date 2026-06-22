import { createContext, useContext, useState, type ReactNode } from 'react'

export type Location = 'issaquah' | 'bothell'

interface LocationContextType {
  location: Location
  setLocation: (loc: Location) => void
  locationName: string
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>('issaquah')

  const locationName = location === 'issaquah' ? 'Issaquah' : 'Bothell'

  return (
    <LocationContext.Provider value={{ location, setLocation, locationName }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within LocationProvider')
  return ctx
}
