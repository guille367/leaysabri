# Next.js Expert Memory - Lean & Sabri Wedding Site

## Dynamic Metadata Implementation

### Guest Invitation Codes
- Home page (`/src/app/page.tsx`) uses query parameter `?code=XXXXX` to identify guests
- Guest data fetched from DynamoDB using `getGuestByCode(code)` from `@/lib/dynamodb`
- Guest interface includes: id, name, guests[], guestsAmount, dietaryRestrictions, code, confirmado, timestamps

### Metadata Pattern
- `generateMetadata` implemented in home page to create personalized Open Graph tags
- Extracts code from `searchParams` (Promise-based in Next.js 15+)
- Fetches guest data server-side during metadata generation
- Returns personalized title and description with guest name when code is valid
- Falls back to generic metadata if no code or guest not found
- Includes both Open Graph and Twitter Card tags with locale `es_ES`

### Key Files
- `/src/app/page.tsx` - Home page with dynamic metadata
- `/src/app/layout.tsx` - Root layout with fallback metadata
- `/src/app/admin/page.tsx` - Admin page with robots noindex
- `/src/lib/dynamodb.ts` - Database utilities including `getGuestByCode()`

## Architecture Notes
- Server Components by default - guest fetching happens server-side
- Client components marked with `'use client'` (e.g., HomeClient, WeddingEnvelope with framer-motion)
- Spanish language throughout (`lang="es"` in HTML)
- Production image: `https://bodaleanysabri.com/retrait.jpg`
