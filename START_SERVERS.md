# Quick Start - Run Both Servers

## Windows (CMD)

### Method 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open: `http://localhost:5173`

---

### Method 2: One Command (Requires npm-run-all)

First install:
```bash
npm install -g npm-run-all
```

Then run from root:
```bash
npm-run-all --parallel "cd backend && npm run dev" "cd frontend && npm run dev"
```

---

## Windows (PowerShell)

### Terminal 1 - Backend:
```powershell
cd backend; npm run dev
```

### Terminal 2 - Frontend:
```powershell
cd frontend; npm run dev
```

---

## Expected Output

### Backend Terminal
```
Server running on http://localhost:5000
```

### Frontend Terminal
```
VITE v5.4.21  ready in 19350 ms
➜  Local:   http://localhost:5173/
```

---

## Verify Connection

### Test 1: Backend Health
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"OK"}`

### Test 2: Frontend
Open browser: `http://localhost:5173`
Should load without errors

### Test 3: API Connection
1. Go to Projects page
2. Should load projects from backend
3. No red errors in console

---

## Troubleshooting

### "ECONNREFUSED" Error
- Backend is not running
- Start backend first: `cd backend && npm run dev`

### "Port already in use"
- Change PORT in `backend/.env`
- Or kill the process using the port

### "Cannot find module"
```bash
cd backend
npm install
npm run dev
```

---

## Summary

1. **Terminal 1:** `cd backend && npm run dev`
2. **Terminal 2:** `cd frontend && npm run dev`
3. **Browser:** Open `http://localhost:5173`
4. **Done!** ✅

The error will disappear once backend is running.
