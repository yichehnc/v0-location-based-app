-- Delete all existing places to refresh with Melbourne data
DELETE FROM public.places;

-- Reseed with Melbourne quiet green spaces
INSERT INTO public.places (name, latitude, longitude, description, address, category, tags) VALUES
  (
    'Birrarung Marr Lower Terrace',
    -37.8155,
    144.9735,
    'Peaceful riverside retreat along the Yarra with native river red gums, shaded benches, and serene water views. Perfect for quiet contemplation.',
    'Birrarung Marr, Melbourne VIC 3000',
    'park',
    ARRAY['shade', 'seating', 'water', 'nature', 'peaceful', 'riverside']
  ),
  (
    'Oddy''s Green',
    -37.7939,
    145.0147,
    'Hidden gem in Cremorne with lush gardens, winding paths, and minimal crowds. A serene botanical escape with bird watching opportunities.',
    'Cremorne VIC 3121',
    'garden',
    ARRAY['shade', 'seating', 'dog-friendly', 'garden', 'quiet', 'wildlife']
  ),
  (
    'Fitzroy Gardens Quiet Corner',
    -37.8169,
    145.0104,
    'Tucked-away seating areas among heritage elms and exotic conifers. Perfect for lunch breaks or peaceful reflection without the crowds.',
    'Fitzroy Gardens, Melbourne VIC 3002',
    'garden',
    ARRAY['seating', 'shade', 'peaceful', 'historic', 'garden']
  ),
  (
    'Dandenong Creek Trail Sanctuary',
    -37.8239,
    145.1147,
    'A serene bush trail with native plants, quiet benches, and excellent bird watching along the creek. Natural and secluded.',
    'Box Hill VIC 3128',
    'forest',
    ARRAY['shade', 'seating', 'nature', 'wildlife', 'walking', 'creek']
  ),
  (
    'Abbotsford Convent Precinct',
    -37.8018,
    144.9948,
    'Historic tranquil precinct with heritage gardens, quiet courtyards, and artistic pathways. A contemplative escape from city bustle.',
    'Abbotsford VIC 3067',
    'historic-garden',
    ARRAY['seating', 'scenic', 'historic', 'peaceful', 'art', 'garden']
  ),
  (
    'Melbourne Gardens Hidden Path',
    -37.8227,
    144.9878,
    'Secluded woodland paths within the Royal Botanic Gardens with river views, mature trees, and quiet corners for reflection.',
    'Royal Botanic Gardens South Melbourne VIC 3141',
    'garden',
    ARRAY['shade', 'water', 'nature', 'woodland', 'peaceful', 'dog-friendly']
  ),
  (
    'Yarra Bend Park Lookout',
    -37.7989,
    145.0439,
    'Elevated park with panoramic views of the Yarra River and minimal tourist crowds. Tree-lined walking paths and peaceful seating areas.',
    'Kew VIC 3101',
    'park',
    ARRAY['seating', 'scenic', 'waterfront', 'view', 'shade', 'walking']
  ),
  (
    'Brunswick Lake Sanctuary',
    -37.7505,
    144.9629,
    'A hidden urban lake with native vegetation, boardwalks, and quiet reflective spaces. Great for bird watching and peaceful contemplation.',
    'Brunswick VIC 3056',
    'lake',
    ARRAY['shade', 'seating', 'water', 'wildlife', 'boardwalk', 'peaceful']
  ),
  (
    'Carlton Gardens Tranquil Spaces',
    -37.8063,
    144.9815,
    'Historic formal gardens with heritage trees, ornamental ponds, and secluded corners. Fewer crowds than major tourist attractions.',
    'Carlton VIC 3053',
    'garden',
    ARRAY['shade', 'seating', 'historic', 'water', 'peaceful', 'scenic']
  ),
  (
    'Westerfolds Park Riverside Walk',
    -37.7667,
    145.1422,
    'Tree-lined riverside park with native bushland, walking trails, and peaceful Yarra views. A natural sanctuary away from city noise.',
    'Templestowe VIC 3106',
    'park',
    ARRAY['shade', 'seating', 'water', 'nature', 'walking', 'dog-friendly', 'riverside']
  );
