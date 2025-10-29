# Front Cloud Frontend v3

Modern Vue 3 + TypeScript + Element Plus frontend for Front Cloud.

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Element Plus
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Charts**: ECharts
- **Date/Time**: Day.js
- **Icons**: Unplugin Icons with Element Plus Icons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Development

The frontend is configured to run in Docker with hot-reload:

```bash
# Build and start the frontend container
docker-compose up frontend-v3

# Access the app at http://localhost:5173
```

## Project Structure

```
src/
├── layouts/        # Layout components (AppShell, etc.)
├── views/          # Page components
│   ├── auth/       # Authentication pages
│   ├── admin/      # Admin pages (Dashboard, Agents, Rules, etc.)
│   └── saas/       # SaaS pages (Organizations, Members, Billing)
├── stores/         # Pinia stores
├── router/         # Vue Router configuration
├── services/       # API services
├── types/          # TypeScript type definitions
├── styles/         # Global styles and design tokens
└── components/     # Reusable components
```

## Features

- ✅ Vue 3 with TypeScript
- ✅ Element Plus component library
- ✅ Auto-import for components and composables
- ✅ Responsive layout with sidebar and topbar
- ✅ Organization switcher (multi-tenant)
- ✅ Authentication with JWT
- ✅ Dark mode support
- ✅ Docker development workflow

## API Integration

The frontend communicates with the backend API via Axios with:
- Bearer token authentication (stored in localStorage)
- Organization context via `X-Organization-ID` header
- Automatic error handling and user notifications

## Environment Variables

Create a `.env.local` file for local development:

```env
VITE_API_URL=http://localhost:8666/api
```
