# Front Cloud - Quick Start Guide

## 🚀 Local Development (Recommended)

### Prerequisites
- Node.js 20+
- Go 1.21+
- PostgreSQL (local or Docker)

### Start in 3 Steps

1. **Terminal 1 - Database**:
   ```bash
   docker-compose up database
   ```

2. **Terminal 2 - Backend API**:
   ```bash
   cd cmd/api
   go run . -config ../../api.example.yaml
   ```

3. **Terminal 3 - Frontend**:
   ```bash
   cd frontend-v3
   npm install
   npm run dev
   ```

4. **Open Browser**: http://localhost:5173/new

---

## 🐳 Docker Development (Alternative)

### Start Everything with Docker

```bash
# Start database + frontend
docker-compose up

# Backend API (uncomment in docker-compose.yml first)
# Then: docker-compose up
```

**Access**:
- Frontend: http://localhost:5173/new
- API: http://localhost:8666

---

## 📁 Project Structure

```
/workspace/
├── frontend-v3/        ← New Vue 3 UI
│   ├── src/
│   │   ├── views/     ← Pages
│   │   ├── layouts/   ← AppShell layout
│   │   ├── stores/    ← Pinia state
│   │   └── services/  ← API client
│   └── package.json
├── cmd/
│   └── api/           ← Go backend
└── database/          ← DB models
```

---

## 🎨 Features Ready

✅ Vue 3 + TypeScript  
✅ Element Plus UI  
✅ Dark Mode  
✅ Pinia State Management  
✅ Vue Router with Guards  
✅ Axios API Client  
✅ Organization Switcher  
✅ Authentication (Login/Register)  
✅ Dashboard with Stats  
✅ Responsive Design  

---

## 🔧 Configuration

### Frontend Environment

**Development** (`.env.local`):
```env
VITE_API_URL=http://localhost:8666
```

**Production** (`.env.production`):
```env
VITE_API_URL=
```

### API Configuration

Edit `api.example.yaml` for backend settings.

---

## 📝 Default Routes

- `/login` - Login page
- `/register` - Registration
- `/new` - Main app (Dashboard)
- `/new/agents` - Agents management
- `/new/rules` - Rules management
- `/new/organizations` - Organizations
- `/new/members` - Members & Roles
- `/new/billing` - Billing

---

## 🐛 Troubleshooting

### Port Conflicts
- Frontend: Port 5173 (change in `vite.config.ts`)
- Backend: Port 8666 (change in API config)
- Database: Port 5432

### CORS Errors
Ensure backend allows `http://localhost:5173` origin.

### API Connection Failed
1. Check backend is running: `curl http://localhost:8666/health`
2. Check frontend env: `cat frontend-v3/.env.local`
3. Check browser console for errors

---

## 📚 Documentation

- See `frontend-v3/README.md` for frontend details
- See `LOCAL_DEV.md` for local development guide
- See `shield.plan.md` for full migration plan

---

## 🎯 Next Steps

1. ✅ Frontend scaffold complete
2. ⏳ Connect real backend APIs
3. ⏳ Add CRUD operations for Agents/Rules
4. ⏳ Production Docker build
5. ⏳ Deploy to production

**Status**: Phase 1 Complete - Ready for API integration!
