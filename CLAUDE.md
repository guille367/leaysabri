# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript check + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture

This is a wedding invitation website built with React 19, TypeScript, and Vite.

### Routing

Two routes defined in [App.tsx](src/App.tsx):
- `/` - Home page with animated envelope
- `/invitation` - Letter/invitation content

Navigation between pages is scroll/gesture-based: scrolling down on Home transitions to Invitation, scrolling up on Invitation returns to Home.

### Project Structure

- `src/components/` - Shared components (Letter)
- `src/pages/[PageName]/` - Page components with co-located styles
- `src/pages/[PageName]/components/` - Page-specific components
- `src/styles/` - Global SCSS with CSS variables for theming

### Path Aliases

Configured in both [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json):
- `@root/*` → project root
- `@components/*` → `src/components/*`

### Key Dependencies

- **framer-motion** - Scroll-linked animations (envelope flap, letter emergence)
- **react-router-dom** - Client-side routing
- **SCSS** - Styling with CSS custom properties
