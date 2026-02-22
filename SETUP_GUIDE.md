# Complete Setup Guide - Portfolio Website

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running
- Git (optional)

---

## FRONTEND SETUP

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install All Modules
```bash
npm install
```

**This installs:**
- ✅ react (18.2.0) - UI library
- ✅ react-dom (18.2.0) - DOM rendering
- ✅ react-router-dom (6.20.0) - Routing
- ✅ axios (1.6.0) - HTTP client
- ✅ typescript (5.3.0) - Type checking
- ✅ vite (5.0.0) - Build tool
- ✅ tailwindcss (3.3.0) - Styling
- ✅ postcss (8.4.0) - CSS processing
- ✅ autoprefixer (10.4.0) - Browser compatibility
- ✅ @types/react & @types/react-dom - TypeScript types

### Step 3: Start Development Server
```bash
npm run dev
```

**Output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend is running!

---

## BACKEND SETUP

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install All Modules
```bash
npm install
```

**This installs:**
- ✅ express (4.18.0) - Web framework
- ✅ cors (2.8.5) - Cross-origin requests
- ✅ dotenv (16.3.0) - Environment variables
- ✅ pg (8.11.0) - PostgreSQL client
- ✅ express-validator (7.0.0) - Input validation
- ✅ typescript (5.3.0) - Type checking
- ✅ ts-node (10.9.0) - TypeScript runner
- ✅ @types/express, @types/node, @types/cors - TypeScript types

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Update .env with Your Database
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:5173
```

### Step 5: Create Database
```bash
createdb portfolio_db
```

### Step 6: Run Migrations
```bash
npm run db:migrate
```

**Output:**
```
Running migrations...
Migrations completed successfully
```

### Step 7: Start Backend Server
```bash
npm run dev
```

**Output:**
```
Server running on http://localhost:5000
```

✅ Backend is running!

---

## VERIFY EVERYTHING WORKS

### Test Frontend
1. Open browser: `http://localhost:5173`
2. You should see the portfolio homepage
3. Try clicking navigation links
4. Toggle light/dark mode (sun/moon icon)

### Test Backend
1. Open new terminal
2. Run: `curl http://localhost:5000/health`
3. Should return: `{"status":"OK"}`

### Test API Connection
1. Go to Projects page in frontend
2. Should load projects from backend
3. Check browser console for any errors

---

## COMPLETE MODULE LIST

### Frontend Modules (9 packages)

| Module | Version | Purpose |
|--------|---------|---------|
| react | 18.2.0 | UI library |
| react-dom | 18.2.0 | DOM rendering |
| react-router-dom | 6.20.0 | Page routing |
| axios | 1.6.0 | API requests |
| typescript | 5.3.0 | Type checking |
| vite | 5.0.0 | Build tool |
| tailwindcss | 3.3.0 | CSS framework |
| postcss | 8.4.0 | CSS processor |
| autoprefixer | 10.4.0 | CSS prefixes |

### Backend Modules (8 packages)

| Module | Version | Purpose |
|--------|---------|---------|
| express | 4.18.0 | Web framework |
| cors | 2.8.5 | CORS handling |
| dotenv | 16.3.0 | Env variables |
| pg | 8.11.0 | PostgreSQL |
| express-validator | 7.0.0 | Validation |
| typescript | 5.3.0 | Type checking |
| ts-node | 10.9.0 | TS runner |
| @types/* | latest | Type definitions |

---

## COMMON COMMANDS

### Frontend
```bash
cd frontend

npm install          # Install modules
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code
```

### Backend
```bash
cd backend

npm install          # Install modules
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run db:migrate   # Run database migrations
```

---

## TROUBLESHOOTING

### "Module not found" Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
- Frontend: Vite will use next available port
- Backend: Change PORT in .env

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres

# Create database if missing
createdb portfolio_db

# Run migrations
npm run db:migrate
```

### Tailwind Styles Not Working
```bash
# Restart dev server
npm run dev
```

### TypeScript Errors
```bash
# Check all errors
npm run build
```

---

## DEPLOYMENT

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
npm run build
npm start
```

---

## SUPPORT

- Frontend issues: Check browser console (F12)
- Backend issues: Check terminal output
- Database issues: Check PostgreSQL logs
- API issues: Use `curl` to test endpoints

---

## NEXT STEPS

1. ✅ Install frontend modules: `cd frontend && npm install`
2. ✅ Install backend modules: `cd backend && npm install`
3. ✅ Setup database: `createdb portfolio_db`
4. ✅ Run migrations: `npm run db:migrate`
5. ✅ Start both servers
6. ✅ Open `http://localhost:5173`
7. ✅ Start developing!

Happy coding! 🚀
