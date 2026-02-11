# Next.js Expert Memory - Lean & Sabri Wedding Site

## Project Info
- Next.js 16.1.6 with App Router
- TypeScript, SCSS, framer-motion
- AWS DynamoDB for guest data

## Dynamic Metadata & OG Images

### Guest Invitation Codes
- Home page (`/src/app/page.tsx`) uses query parameter `?code=XXXXX` to identify guests
- Guest data fetched from DynamoDB using `getGuestByCode(code)` from `@/lib/dynamodb`
- Guest interface includes: id, name, guests[], guestsAmount, dietaryRestrictions, code, confirmado, timestamps

### OG Image Generation (2026-02-11)
- **API Route:** `/src/app/api/og/route.tsx` - Edge runtime, generates 1200x630 PNG
- Uses `ImageResponse` from `next/og` with personalized guest names
- Accepts `?code=XXXXX` query param for guest-specific images
- Background: `retrait.jpg` fetched from production URL, converted to base64 data URI
- Visual: Semi-transparent overlay + white text with shadows (Playfair Display/Cormorant Garamond)
- URLs: `https://bodaleanysabri.com/api/og` (default) or `https://bodaleanysabri.com/api/og?code=ABC123` (personalized)

### Metadata Pattern
- `generateMetadata` in `/src/app/page.tsx` and `/src/app/layout.tsx`
- Extracts code from `searchParams` (Promise-based in Next.js 16)
- Fetches guest data server-side during metadata generation
- OG image URL includes guest code for personalization
- Returns personalized title, description, and OG image when code is valid
- Falls back to generic metadata if no code or guest not found
- Includes Open Graph and Twitter Card tags with locale `es_ES`, dimensions 1200x630

### Key Files
- `/src/app/api/og/route.tsx` - Dynamic OG image generator
- `/src/app/page.tsx` - Home page with dynamic metadata
- `/src/app/layout.tsx` - Root layout with fallback metadata
- `/src/app/admin/page.tsx` - Admin page with robots noindex
- `/src/lib/dynamodb.ts` - Database utilities including `getGuestByCode()`

## Architecture Notes
- Server Components by default - guest fetching happens server-side
- Client components marked with `'use client'` (e.g., HomeClient, WeddingEnvelope with framer-motion)
- Spanish language throughout (`lang="es"` in HTML)
- Edge runtime used for OG image API (no file system access, HTTP-only image fetching)
