# Quick Start - 5 Minutes to Running

## Prerequisites (Do Once)

```bash
# 1. Check Node.js installed
node --version  # Should be 18+

# 2. Check PostgreSQL installed
psql --version

# 3. Create database
createdb portfolio_db

# 4. Run migrations
cd backend
npm run db:migrate
cd ..
```

---

## Every Time You Want to Run

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Wait for: `Server running on http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:5173`

### Terminal 3 - Open Browser
```
http://localhost:5173
```

---

## That's It! ✅

Your portfolio is now running with:
- ✅ Frontend on port 5173
- ✅ Backend on port 5000
- ✅ Database connected
- ✅ All features working

---

## Quick Tests

### Test 1: Projects Page
1. Click "Projects" in navbar
2. Should show 3 projects from database
3. No errors in console

### Test 2: Contact Form
1. Click "Contact" in navbar
2. Fill out form
3. Click Send
4. Should show success message

### Test 3: Light/Dark Mode
1. Click sun/moon icon in navbar
2. Should toggle theme

---

## If Something Goes Wrong

### Backend won't start
```bash
cd backend
npm install
npm run dev
```

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### Database error
```bash
createdb portfolio_db
cd backend
npm run db:migrate
```

### Can't connect to backend
- Make sure backend is running on port 5000
- Check: `curl http://localhost:5000/health`

---

## Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 5000 | http://localhost:5000 |
| Database | 5432 | localhost:5432 |

---

## Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run db:migrate   # Create database tables

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production

# Database
createdb portfolio_db                    # Create database
psql -U postgres -d portfolio_db -c "\dt"  # List tables
psql -U postgres -d portfolio_db         # Connect to database
```

---

## Success Checklist

- [ ] PostgreSQL running
- [ ] Database created: `portfolio_db`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Browser shows homepage
- [ ] Projects page loads data
- [ ] Contact form works
- [ ] No errors in console

---

## Next Steps

1. ✅ Get everything running (above)
2. ✅ Verify it works (VERIFY_SETUP.md)
3. ✅ Customize with your info
4. ✅ Add your projects to database
5. ✅ Deploy to production

---

## Need Help?

- **Setup issues:** See COMPLETE_SETUP.md
- **Verification:** See VERIFY_SETUP.md
- **Backend errors:** See backend/FIX_ERRORS.md
- **Connection issues:** See BACKEND_CONNECTION_FIX.md

---

**Happy coding!** 🚀
