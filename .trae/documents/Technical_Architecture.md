## 1. Architecture Design
Frontend-only marketing page integrated into the existing Vite + React 19 + Tailwind application.

## 2. Technology Description
- **Frontend**: React@19 + Tailwind CSS v4 + Vite
- **Routing**: react-router-dom
- **Animation**: framer-motion (scroll animations, layout animations, spring physics)
- **Icons**: lucide-react

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| `/` | The public landing page. (Currently, `/` might be mapped to the protected Admin Home. We will need to re-route the public landing page to `/` and move the protected dashboard to `/dashboard` or `/admin`, or map the landing page to a specific public route. Given standard practices, `/` should be the public landing page). |

*Note on Routing Adjustment*: 
Currently in `src/routes/index.tsx`, `/` is protected. We will expose `/` as the public landing page, and move the existing `Home` (admin dashboard) to `/admin/dashboard` or similar, OR keep `/` public and handle authentication redirects if logged in. For this task, we will create a `PublicLanding` component and map it to a public route (e.g., `/` or `/welcome`).

## 4. API Definitions
N/A - Static frontend marketing page.

## 5. Component Structure
- `src/pages/public/LandingPage.tsx`
  - `HeroSection`
  - `AboutOwnerSection`
  - `FeaturesSection`
  - `CallToActionSection`
