# NextjsFrontend – Developer & QA Onboarding

## Prerequisites
- Node 18+ (Next.js 15)
- Copy `.env.example` to `.env.local` and set:
  - NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

## Scripts
- npm run dev
- npm run build
- npm start

## Architecture Overview
- App Router with SSR/ISR:
  - / (health, quick links)
  - /blogs (SSR list)
  - /blogs/[id] (SSR details)
  - /blogs/new (client create with autosave + live preview)
  - /themes (client customization + backend themes)
  - /notifications (client list)
  - /profile (client get/update)
  - /admin (client user/admin ops)
- Shared providers:
  - ThemeProvider (CSS vars, dark/light)
  - ToasterProvider (ephemeral notifications)

## API Integration
Centralized in `src/lib/api.ts`. Configure `NEXT_PUBLIC_API_BASE_URL`. Uses fetch with credentials=include.

## Accessibility
- Skip link, focus-visible outlines, ARIA roles/messages in form/alerts.
- Color contrast aware themes.

## Extensibility Hooks
- useThemeSettings(): read/update theme settings and live preview.
- useToaster(): push in-app notifications.

## QA Notes
- Health check: GET /api/v1/health (shows on home)
- Auth stubs use backend /api/v1/auth/* endpoints.
- User/admin operations in /admin map to /api/v1/users* paths.
- Comment submit posts to app route and proxies to backend.

## Future Work
- Wire actual auth cookie/session handling and protected routes.
- Rich-text editor for post creation.
- Comment listing and moderation UI.
