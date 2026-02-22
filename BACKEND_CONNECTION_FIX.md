# Backend Connection Error Fix

## Problem
```
[vite] http proxy error: /projects
AggregateError [ECONNREFUSED]
```

This means the frontend is trying to connect to the backend but it's not running.

## Solution

### Step 1: Start Backend Server

Open a **NEW terminal** and run:

```bash
cd backend
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
```

### Step 2: Verify Backend is Running

In another terminal, test the backend:

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{"status":"OK"}
```

### Step 3: Frontend Will Auto-Connect

Once backend is running, the frontend will automatically connect. You should see:

```
✓ Projects loaded successfully
✓ No more proxy errors
```

## Complete Setup (Both Servers)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Terminal 3 - Optional (for testing)
```bash
curl http://localhost:5000/health
```

## Troubleshooting

### Error: "Port 5000 already in use"
```bash
# Change PORT in backend/.env
PORT=5001
```

### Error: "Cannot connect to database"
```bash
# Check database is running
createdb portfolio_db

# Run migrations
cd backend
npm run db:migrate
```

### Error: "Module not found"
```bash
# Reinstall backend dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Verify Everything

### Check 1: Backend Running
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK"}
```

### Check 2: Frontend Running
Open browser: `http://localhost:5173`
Should load without errors

### Check 3: API Connection
Go to Projects page in frontend
Should load projects from backend

## Quick Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Database created: `portfolio_db`
- [ ] Migrations run: `npm run db:migrate`
- [ ] No proxy errors in frontend console
- [ ] Projects page loads data

## Common Ports

| Service | Port | Command |
|---------|------|---------|
| Backend | 5000 | `npm run dev` |
| Frontend | 5173 | `npm run dev` |
| Database | 5432 | PostgreSQL |

## If Still Getting Errors

### Option 1: Full Restart
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2 (new)
cd frontend
npm run dev
```

### Option 2: Check Logs
- Backend terminal: Look for "Server running on..."
- Frontend terminal: Look for "Local: http://localhost:5173"

### Option 3: Clear Cache
```bash
# Frontend
rm -rf node_modules/.vite

# Backend
rm -rf node_modules/.cache
```

## Success Indicators

✅ Backend shows: `Server running on http://localhost:5000`
✅ Frontend shows: `Local: http://localhost:5173`
✅ No red errors in frontend console
✅ Projects page loads data
✅ No "ECONNREFUSED" errors

---

**The error is NOT a code error - it's just the backend not running!**

Start the backend and everything will work perfectly. 🚀
