-- Seed quiet places data
INSERT INTO public.places (name, latitude, longitude, description, address, category, tags) VALUES
  (
    'Central Park Meadow',
    40.7829,
    -73.9654,
    'A peaceful meadow away from the main paths, perfect for quiet contemplation with plenty of shade.',
    '5th Ave at 72nd St, New York, NY',
    'park',
    ARRAY['shade', 'seating', 'water', 'nature', 'peaceful']
  ),
  (
    'Riverside Botanical Garden',
    40.7614,
    -73.9776,
    'Hidden gem with curated gardens, winding paths, and minimal crowds. Great for peaceful walks.',
    'Central Park West, New York, NY',
    'garden',
    ARRAY['shade', 'seating', 'dog-friendly', 'garden', 'quiet']
  ),
  (
    'Waterfront Park Alcove',
    40.7061,
    -74.0088,
    'Tucked-away seating area with views of the water. Perfect for lunch breaks or quiet reflection.',
    'Battery Park, New York, NY',
    'park',
    ARRAY['seating', 'water', 'waterfront', 'peaceful']
  ),
  (
    'Queens Hidden Oasis',
    40.7282,
    -73.7949,
    'A serene urban garden with native plants, quiet benches, and bird watching opportunities.',
    'Flushing, Queens, NY',
    'garden',
    ARRAY['shade', 'seating', 'garden', 'wildlife']
  ),
  (
    'Brooklyn Heights Promenade',
    40.6931,
    -73.9903,
    'Elevated walkway with stunning views and fewer crowds on weekday mornings. Quiet and contemplative.',
    'Brooklyn Heights, Brooklyn, NY',
    'park',
    ARRAY['seating', 'scenic', 'waterfront', 'view']
  ),
  (
    'The Ramble in Central Park',
    40.7756,
    -73.9735,
    'Winding woodland paths away from crowds. Natural and serene atmosphere with plenty of shade.',
    'Central Park, New York, NY',
    'forest',
    ARRAY['shade', 'water', 'nature', 'woodland']
  ),
  (
    'Hudson River Greenway Rest Area',
    40.7489,
    -74.0040,
    'Peaceful spot along the greenway with benches, trees, and river views. Great for escaping city noise.',
    'Hudson River Greenway, New York, NY',
    'park',
    ARRAY['shade', 'seating', 'water', 'waterfront']
  ),
  (
    'East River Waterfront Park',
    40.7177,
    -73.9787,
    'Modern park with thoughtful design, trees for shade, and calm water views. Fewer tourists than major parks.',
    'East River, New York, NY',
    'park',
    ARRAY['shade', 'seating', 'dog-friendly', 'waterfront']
  ),
  (
    'Domino Park Lookout',
    40.7136,
    -73.9576,
    'Elevated park with panoramic views and secluded seating areas. Industrial aesthetic meets tranquility.',
    'Williamsburg, Brooklyn, NY',
    'park',
    ARRAY['seating', 'scenic', 'view']
  ),
  (
    'Governors Island Quiet Path',
    40.6867,
    -74.0168,
    'Car-free island with minimal crowds, tree-lined paths, and waterfront seating. Perfect escape from city bustle.',
    'Governors Island, New York, NY',
    'island',
    ARRAY['shade', 'seating', 'water', 'dog-friendly', 'island']
  );
