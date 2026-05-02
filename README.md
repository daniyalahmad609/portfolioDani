# OneX Studio Portfolio

Premium portfolio website for OneX Studio (Daniyal Ahmad) built with:

- Next.js App Router
- Tailwind CSS
- Framer Motion
- React Three Fiber + Drei
- Supabase (PostgreSQL + Storage)

## Setup

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Fill Supabase values
3. Run SQL:
   - `supabase/migrations/001_init.sql`
   - `supabase/seed.sql`
4. Start:
   - `npm run dev`

## Content and routes

- Public site: `/`
- Project details: `/projects/[id]`
- Admin dashboard: `/admin`
- Admin sections:
  - `/admin/services`
  - `/admin/projects`
  - `/admin/profile`
  - `/admin/skills`
  - `/admin/contact`

## Storage buckets (Supabase)

Create these public buckets:

- `services`
- `projects`
- `profiles`
