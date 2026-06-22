ALTER TABLE pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read pieces" ON pieces FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read store_hours" ON store_hours FOR SELECT USING (true);
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Full access pieces" ON pieces FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access store_hours" ON store_hours FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access notes" ON notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access inventory" ON inventory FOR ALL USING (true) WITH CHECK (true);
