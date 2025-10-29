# Local Development Setup (No Docker)

## Prerequisites

- Node.js 20+ installed
- Go 1.21+ installed (for backend API)
- PostgreSQL running locally

## Quick Start

### 1. Start Backend API (in one terminal)

```bash
# From project root
cd cmd/api
go run . -config ../../api.example.yaml
```

The API will start on `http://localhost:8666`

### 2. Start Frontend (in another terminal)

```bash
# From project root
cd frontend-v3
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Access the Application

Open your browser to:
- **Frontend**: http://localhost:5173/new
- **API**: http://localhost:8666 (backend)

## Environment Configuration

The frontend is configured to connect to the local API automatically:

**`.env.local`** (already configured):
```env
VITE_API_URL=http://localhost:8666
```

## Database Setup

If you need to set up the database:

```bash
# Start PostgreSQL with Docker (if you prefer)
docker-compose up database

# Or use your local PostgreSQL instance
# Update database.env with your local credentials
```

## Development Workflow

1. **Backend changes**: Stop and restart `go run .`
2. **Frontend changes**: Hot-reload is automatic (Vite HMR)
3. **Database changes**: Run migrations as needed

## Troubleshooting

### CORS Issues
The backend API should have CORS enabled for `http://localhost:5173`

### API Connection Failed
- Verify backend is running on port 8666
- Check `VITE_API_URL` in `.env.local`
- Check browser console for errors

### Port Already in Use
- Frontend: Change port in `vite.config.ts` (default 5173)
- Backend: Change port in API config file

## Production Build (Local)

To test the production build locally:

```bash
cd frontend-v3
npm run build
npm run preview
```

This will build and serve the production bundle on `http://localhost:4173`
