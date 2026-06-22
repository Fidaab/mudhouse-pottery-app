CREATE TABLE pieces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT DEFAULT '🎨',
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  status TEXT DEFAULT 'painting',
  dropped_off DATE DEFAULT CURRENT_DATE,
  estimated_ready DATE,
  location TEXT NOT NULL,
  order_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT DEFAULT '🎨',
  difficulty TEXT DEFAULT 'Easy',
  category TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE store_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  UNIQUE(location, day_of_week)
);

CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT DEFAULT 'Staff',
  pinned BOOLEAN DEFAULT false,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_contact TEXT,
  booking_type TEXT,
  party_package TEXT,
  guest_count INTEGER DEFAULT 1,
  slot_date DATE NOT NULL,
  slot_time TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  reorder_at INTEGER DEFAULT 5,
  unit TEXT DEFAULT 'pcs',
  location TEXT NOT NULL,
  UNIQUE(name, location)
);
