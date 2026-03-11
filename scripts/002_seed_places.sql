-- Seed quiet places data
INSERT INTO public.places (name, latitude, longitude, description, amenities, tags) VALUES
  (
    'Central Park Meadow',
    40.7829,
    -73.9654,
    'A peaceful meadow away from the main paths, perfect for quiet contemplation with plenty of shade.',
    ARRAY['shade', 'seating', 'water'],
    ARRAY['nature', 'peaceful', 'open-space']
  ),
  (
    'Riverside Botanical Garden',
    40.7614,
    -73.9776,
    'Hidden gem with curated gardens, winding paths, and minimal crowds. Great for peaceful walks.',
    ARRAY['shade', 'seating', 'dog-friendly'],
    ARRAY['garden', 'quiet', 'scenic']
  ),
  (
    'Waterfront Park Alcove',
    40.7061,
    -74.0088,
    'Tucked-away seating area with views of the water. Perfect for lunch breaks or quiet reflection.',
    ARRAY['seating', 'water'],
    ARRAY['waterfront', 'peaceful', 'scenic']
  ),
  (
    'Queens Hidden Oasis',
    40.7282,
    -73.7949,
    'A serene urban garden with native plants, quiet benches, and bird watching opportunities.',
    ARRAY['shade', 'seating'],
    ARRAY['garden', 'wildlife', 'peaceful']
  ),
  (
    'Brooklyn Heights Promenade',
    40.6931,
    -73.9903,
    'Elevated walkway with stunning views and fewer crowds on weekday mornings. Quiet and contemplative.',
    ARRAY['seating'],
    ARRAY['scenic', 'peaceful', 'waterfront']
  ),
  (
    'The Ramble in Central Park',
    40.7756,
    -73.9735,
    'Winding woodland paths away from crowds. Natural and serene atmosphere with plenty of shade.',
    ARRAY['shade', 'water'],
    ARRAY['nature', 'woodland', 'peaceful']
  ),
  (
    'Hudson River Greenway Rest Area',
    40.7489,
    -74.0040,
    'Peaceful spot along the greenway with benches, trees, and river views. Great for escaping city noise.',
    ARRAY['shade', 'seating', 'water'],
    ARRAY['waterfront', 'peaceful', 'green-space']
  ),
  (
    'East River Waterfront Park',
    40.7177,
    -73.9787,
    'Modern park with thoughtful design, trees for shade, and calm water views. Fewer tourists than major parks.',
    ARRAY['shade', 'seating', 'dog-friendly'],
    ARRAY['waterfront', 'modern', 'peaceful']
  ),
  (
    'Domino Park Lookout',
    40.7136,
    -73.9576,
    'Elevated park with panoramic views and secluded seating areas. Industrial aesthetic meets tranquility.',
    ARRAY['seating'],
    ARRAY['scenic', 'modern', 'peaceful']
  ),
  (
    'Governors Island Quiet Path',
    40.6867,
    -74.0168,
    'Car-free island with minimal crowds, tree-lined paths, and waterfront seating. Perfect escape from city bustle.',
    ARRAY['shade', 'seating', 'water', 'dog-friendly'],
    ARRAY['island', 'peaceful', 'green-space', 'scenic']
  );
