insert into profiles (id, name, bio, education, image) values
('main-profile', 'Daniyal Ahmad', 'Daniyal Ahmad, a specialist in high-end visual communication. We transform brands into icons through a blend of technical precision and minimalist luxury. Focusing on Branding, UI/UX, and Packaging, I bridge the gap between creative intuition and strategic execution. Here, design is not just an asset - it is a premium experience.', 'FSc (Pre-Medical)', null)
on conflict (id) do update set name = excluded.name, bio = excluded.bio, education = excluded.education, image = excluded.image;

insert into contact (id, email, phone, whatsapp, location) values
('main-contact', 'daniyalmustafa609@gmail.com', '03166976309', '03166976309', 'Jampur District Rajanpur')
on conflict (id) do update set email = excluded.email, phone = excluded.phone, whatsapp = excluded.whatsapp, location = excluded.location;

insert into skills (id, name, sort_order) values
('skill-1', 'Visual Hierarchy & Composition', 1),
('skill-2', 'Typography Fundamentals', 2),
('skill-3', 'Color Theory', 3),
('skill-4', 'Adobe Illustrator', 4),
('skill-5', 'Adobe Photoshop', 5),
('skill-6', 'Figma (UI/UX)', 6)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order;

insert into services (id, title, description, image, sort_order) values
('logo-design', 'Logo Design', 'Crafting distinctive and scalable logo identities that define your brand core essence. Designed with precision for timeless recognition and versatility across platforms.', null, 1),
('brand-identity-design', 'Brand Identity Design', 'Building complete visual systems that elevate brands into premium, recognizable experiences. Every detail is aligned for consistency and impact.', null, 2),
('social-media-design', 'Social Media Design', 'Creating high-converting, visually engaging social media content that drives audience interaction with modern layouts.', null, 3),
('poster-banner-design', 'Poster & Banner Design', 'Designing bold posters and banners that communicate messages instantly for digital and print.', null, 4),
('packaging-design', 'Packaging Design', 'Developing premium packaging that combines aesthetics with functional brand storytelling and shelf impact.', null, 5),
('brochure-print-design', 'Brochure & Print Design', 'Designing structured and professional print materials with balanced layouts and typography.', null, 6),
('panaflex-advertising-design', 'Panaflex & Advertising Design', 'Creating large-scale advertising visuals with strong hierarchy and high visibility.', null, 7),
('ui-ux-design', 'UI/UX Design', 'Designing intuitive modern digital interfaces focused on usability and seamless interaction.', null, 8)
on conflict (id) do update set title = excluded.title, description = excluded.description, image = excluded.image, sort_order = excluded.sort_order;

insert into projects (id, title, category, description, images, sort_order) values
('maldives-travel-poster', 'Maldives Travel Poster', 'Print', 'A vibrant luxury travel campaign poster focused on wanderlust and premium tourism.', ARRAY[]::text[], 1),
('furniture-brochure-design', 'Furniture Brochure Design', 'Branding', 'Editorial brochure layout designed for a premium interior furniture catalog.', ARRAY[]::text[], 2),
('vitamin-c-serum-packaging', 'Vitamin C Serum Packaging', 'Packaging', 'Modern skincare packaging system with clean hierarchy and luxury shelf impact.', ARRAY[]::text[], 3)
on conflict (id) do update set title = excluded.title, category = excluded.category, description = excluded.description, images = excluded.images, sort_order = excluded.sort_order;
