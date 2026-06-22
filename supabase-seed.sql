INSERT INTO gallery (name, image, difficulty, category, description) VALUES
('Classic Mug', '☕', 'Easy', 'Mugs', 'A simple mug with your own pattern'),
('Floral Plate', '🌸', 'Medium', 'Plates', 'Delicate flower pattern on a dinner plate'),
('Animal Figurine', '🐱', 'Advanced', 'Figurines', 'Detailed cat figurine with fine brushwork'),
('Heart Bowl', '💜', 'Easy', 'Bowls', 'Heart-shaped trinket bowl'),
('Galaxy Vase', '🌌', 'Advanced', 'Vases', 'Deep space swirl effect on a tall vase'),
('Polka Dot Cup', '🔵', 'Easy', 'Mugs', 'Fun polka dot pattern on a teacup'),
('Mandala Plate', '🎨', 'Advanced', 'Plates', 'Intricate mandala design'),
('Simple Bowl', '🥣', 'Easy', 'Bowls', 'Solid color dip bowl'),
('Succulent Planter', '🪴', 'Medium', 'Planters', 'Small planter with leaf motif'),
('Pet Portrait Mug', '🐶', 'Medium', 'Mugs', 'Paint your pet on a mug'),
('Rainbow Plate', '🌈', 'Easy', 'Plates', 'Colorful rainbow stripe pattern'),
('Owl Figurine', '🦉', 'Medium', 'Figurines', 'Cute owl with textured feathers');

INSERT INTO store_hours (location, day_of_week, open_time, close_time, is_closed) VALUES
('issaquah', 'Monday', NULL, NULL, true),
('issaquah', 'Tuesday', '10:00', '20:00', false),
('issaquah', 'Wednesday', '10:00', '20:00', false),
('issaquah', 'Thursday', '10:00', '20:00', false),
('issaquah', 'Friday', '10:00', '20:00', false),
('issaquah', 'Saturday', '10:00', '20:00', false),
('issaquah', 'Sunday', '11:00', '17:00', false),
('bothell', 'Monday', NULL, NULL, true),
('bothell', 'Tuesday', '10:00', '20:00', false),
('bothell', 'Wednesday', '10:00', '20:00', false),
('bothell', 'Thursday', '10:00', '20:00', false),
('bothell', 'Friday', '10:00', '20:00', false),
('bothell', 'Saturday', '10:00', '20:00', false),
('bothell', 'Sunday', '11:00', '17:00', false);

INSERT INTO inventory (name, stock, reorder_at, unit, location) VALUES
('Mugs (small)', 24, 10, 'pcs', 'issaquah'),
('Mugs (large)', 8, 10, 'pcs', 'issaquah'),
('Plates (dinner)', 15, 8, 'pcs', 'issaquah'),
('Bowls', 18, 10, 'pcs', 'issaquah'),
('Figurines', 6, 5, 'pcs', 'issaquah'),
('Red paint', 3, 5, 'bottles', 'issaquah'),
('Blue paint', 7, 5, 'bottles', 'issaquah'),
('Clear glaze', 2, 4, 'liters', 'issaquah'),
('Mugs (small)', 20, 10, 'pcs', 'bothell'),
('Mugs (large)', 12, 10, 'pcs', 'bothell'),
('Plates (dinner)', 9, 8, 'pcs', 'bothell'),
('Bowls', 14, 10, 'pcs', 'bothell'),
('Figurines', 4, 5, 'pcs', 'bothell'),
('Red paint', 6, 5, 'bottles', 'bothell'),
('Blue paint', 2, 5, 'bottles', 'bothell'),
('Clear glaze', 5, 4, 'liters', 'bothell');

INSERT INTO pieces (name, image, customer_name, customer_phone, status, dropped_off, estimated_ready, location, order_code) VALUES
('Galaxy Vase', '🌌', 'Sarah M.', '425-555-0101', 'firing', '2026-06-19', '2026-06-25', 'issaquah', 'MH-ISS-001'),
('Classic Mug', '☕', 'Sarah M.', '425-555-0101', 'ready', '2026-06-16', '2026-06-23', 'issaquah', 'MH-ISS-002'),
('Floral Plate', '🌸', 'Jake T.', '425-555-0202', 'glazing', '2026-06-20', '2026-06-26', 'issaquah', 'MH-ISS-003'),
('Heart Bowl', '💜', 'Lisa K.', '425-555-0303', 'drying', '2026-06-22', '2026-06-27', 'bothell', 'MH-BOT-001'),
('Polka Dot Cup', '🔵', 'Mike R.', '425-555-0404', 'painting', '2026-06-22', '2026-06-30', 'bothell', 'MH-BOT-002'),
('Mandala Plate', '🎨', 'Anna W.', '425-555-0505', 'firing', '2026-06-20', '2026-06-25', 'bothell', 'MH-BOT-003');

INSERT INTO notes (text, author, pinned, location) VALUES
('Kiln #2 needs element replacement next week. Order parts by Thursday.', 'Shannon', true, 'issaquah'),
('New glaze colors arrived (ocean blue, sunset orange). Unpack and label by Saturday.', 'Staff', false, 'both'),
('Summer camp flyers need to be restocked at front counter.', 'Shannon', false, 'bothell');
