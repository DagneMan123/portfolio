# Verify Setup - Check Everything is Working

## Quick Verification Steps

### Step 1: Check PostgreSQL

```bash
psql -U postgres -c "SELECT version();"
```

**Expected:** PostgreSQL version info
**If error:** PostgreSQL not running or not installed

---

### Step 2: Check Database Exists

```bash
psql -U postgres -l | grep portfolio_db
```

**Expected:** `portfolio_db | postgres | UTF8`
**If error:** Run `createdb portfolio_db`

---

### Step 3: Check Database Tables

```bash
psql -U postgres -d portfolio_db -c "\dt"
```

**Expected:**
```
          List of relations
 Schema |       Name       | Type  | Owner
--------+------------------+-------+----------
 public | contact_messages | table | postgres
 public | projects         | table | postgres
```

**If error:** Run `npm run db:migrate` in backend folder

---

### Step 4: Check Backend Running

```bash
curl http://localhost:5000/health
```

**Expected:** `{"status":"OK"}`
**If error:** Backend not running - run `npm run dev` in backend folder

---

### Step 5: Check Backend Can Access Database

```bash
curl http://localhost:5000/projects
```

**Expected:** 
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    ...
  }
]
```

**If error:** 
- Backend not running
- Database not set up
- .env credentials wrong

---

### Step 6: Check Frontend Running

Open browser: `http://localhost:5173`

**Expected:** Portfolio homepage loads
**If error:** Frontend not running - run `npm run dev` in frontend folder

---

### Step 7: Check Frontend Can Access Backend

1. Open browser: `http://localhost:5173`
2. Go to Projects page
3. Should show 3 projects from database
4. Open DevTools (F12) > Console
5. Should have no red errors

**If error:** 
- Backend not running
- CORS not configured
- API endpoint wrong

---

### Step 8: Test Contact Form

1. Go to Contact page
2. Fill out form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test
   - Message: Test message
3. Click Send
4. Should show success message

**Verify in database:**
```bash
psql -U postgres -d portfolio_db -c "SELECT * FROM contact_messages;"
```

Should show your test message.

---

## Complete Verification Checklist

Run these commands in order:

```bash
# 1. Check PostgreSQL
psql -U postgres -c "SELECT 1;"

# 2. Check database exists
psql -U postgres -l | grep portfolio_db

# 3. Check tables exist
psql -U postgres -d portfolio_db -c "\dt"

# 4. Check sample data
psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"

# 5. Check backend health
curl http://localhost:5000/health

# 6. Check backend can get projects
curl http://localhost:5000/projects

# 7. Check frontend loads
# Open: http://localhost:5173
```

---

## Expected Results

| Check | Command | Expected | Status |
|-------|---------|----------|--------|
| PostgreSQL | `psql -U postgres -c "SELECT 1;"` | `1` | ✅ |
| Database | `psql -U postgres -l \| grep portfolio_db` | `portfolio_db` | ✅ |
| Tables | `psql -U postgres -d portfolio_db -c "\dt"` | 2 tables | ✅ |
| Projects | `psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"` | `3` | ✅ |
| Backend Health | `curl http://localhost:5000/health` | `{"status":"OK"}` | ✅ |
| Backend API | `curl http://localhost:5000/projects` | JSON array | ✅ |
| Frontend | `http://localhost:5173` | Homepage loads | ✅ |
| Projects Page | Navigate to /projects | Shows 3 projects | ✅ |
| Contact Form | Submit form | Success message | ✅ |
| Database | Check contact_messages | New message saved | ✅ |

---

## Troubleshooting by Error

### "psql: command not found"
- PostgreSQL not installed
- Add PostgreSQL to PATH
- Restart terminal

### "database portfolio_db does not exist"
```bash
createdb portfolio_db
npm run db:migrate
```

### "FATAL: Ident authentication failed"
- Wrong PostgreSQL password
- Update backend/.env with correct password

### "curl: (7) Failed to connect"
- Backend not running
- Run: `cd backend && npm run dev`

### "Cannot GET /projects"
- Backend not running
- Check backend is on port 5000

### "Projects page shows loading forever"
- Backend not running
- Check browser console for errors
- Check network tab for failed requests

### "Contact form won't submit"
- Backend not running
- Check browser console for errors
- Check .env CORS_ORIGIN is correct

---

## Full System Check Script

Run all checks at once:

```bash
echo "=== PostgreSQL Check ==="
psql -U postgres -c "SELECT version();" && echo "✅ PostgreSQL OK" || echo "❌ PostgreSQL FAILED"

echo ""
echo "=== Database Check ==="
psql -U postgres -d portfolio_db -c "SELECT 1;" && echo "✅ Database OK" || echo "❌ Database FAILED"

echo ""
echo "=== Tables Check ==="
psql -U postgres -d portfolio_db -c "\dt" && echo "✅ Tables OK" || echo "❌ Tables FAILED"

echo ""
echo "=== Backend Health Check ==="
curl -s http://localhost:5000/health && echo "" && echo "✅ Backend OK" || echo "❌ Backend FAILED"

echo ""
echo "=== Backend API Check ==="
curl -s http://localhost:5000/projects | head -c 100 && echo "" && echo "✅ API OK" || echo "❌ API FAILED"

echo ""
echo "=== All Checks Complete ==="
```

---

## If Everything Passes ✅

Congratulations! Your portfolio is fully set up:

- ✅ PostgreSQL running
- ✅ Database created with tables
- ✅ Sample data loaded
- ✅ Backend running and connected to database
- ✅ Frontend running and connected to backend
- ✅ All API endpoints working
- ✅ Contact form saving to database

**You're ready to customize and deploy!** 🚀

---

## If Something Fails ❌

1. Identify which check failed
2. Go to COMPLETE_SETUP.md
3. Find the troubleshooting section
4. Follow the fix steps
5. Re-run verification

**Most common issues:**
- PostgreSQL not running → Start PostgreSQL service
- Database not created → Run `createdb portfolio_db`
- Backend not running → Run `npm run dev` in backend
- Frontend not running → Run `npm run dev` in frontend
