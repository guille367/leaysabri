# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

Wedding invitation website built with Next.js 14 (App Router), TypeScript, and SCSS.

### Routes

Defined in `src/app/`:
- `/` - Home page with animated envelope that reveals letter on scroll
- `/invitation` - Full invitation with event details, timeline, RSVP
- `/admin` - Guest management panel (password: `LEASABRIW`)
- `/api/guests` - REST API for guest CRUD operations

### Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/views/` - Page view components (Home, Invitation, Admin)
- `src/views/[View]/components/` - View-specific components
- `src/components/` - Shared components
- `src/lib/` - Utilities (Google Sheets integration)
- `src/styles/` - Global SCSS with CSS custom properties
- `amplify/` - AWS Amplify backend configuration

### Path Alias

Configured in `tsconfig.json`:
- `@/*` → `./src/*`

### Backend

Guest data stored in Google Sheets via `src/lib/sheets.ts`. Requires environment variables:
- `GOOGLE_SERVICE_ACCOUNT` - Service account JSON credentials
- `GOOGLE_SPREADSHEET_ID` - Target spreadsheet ID

### Key Dependencies

- **framer-motion** - Scroll-linked animations (envelope, transitions)
- **googleapis** - Google Sheets API for guest management
- **sass** - SCSS styling with CSS custom properties

### Design System

CSS variables defined in `src/views/Invitation/styles/_variables.scss` with `--inv-` prefix for colors, typography, and spacing.
