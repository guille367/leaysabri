# UI/UX Design Expert Memory

## Design System
- Variables in `src/views/Invitation/styles/_variables.scss` with `--inv-` prefix
- Key colors: accent `#c9a86c`, text-primary `#1a1a1a`, text-secondary `#666`, bg-main `#ffffff`
- Fonts: accent (Playfair Display), secondary (Helvetica Neue), primary (Georgia)
- Transitions: fast 150ms, base 250ms, slow 400ms

## Breakpoints (in `src/views/Invitation/styles/_mixins.scss`)
- Mobile: max-width 480px
- Tablet: max-width 768px
- Desktop: min-width 769px

## Component Patterns
- TimelineCarousel: uses `useState`, `useRef`, `useCallback`, `useEffect` for scroll centering
- Modal uses `createPortal` to escape transform context
- Framer Motion `AnimatePresence mode="wait"` for photo transitions
- BEM-like naming: `inv-carousel__element--modifier`

## Animation Patterns
- Title fade-in: `initial={{ opacity: 0, y: 20 }}` + `whileInView`
- Year label: `initial={{ opacity: 0, y: -10 }}` with 0.3s duration
- Photo grid: `initial={{ opacity: 0, x: 50 }}` enter, `exit={{ opacity: 0, x: -50 }}` with 0.4s
- Modal: opacity 0.3s, content scale 0.95 to 1 in 0.2s
