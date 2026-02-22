# Immediate Fix - Do This Now

## Your Error
```
Error fetching projects: error: relation "projects" does not exist
```

## Why
Database tables weren't created.

## Fix (Copy & Paste)

### Step 1: Stop Backend
Press `Ctrl+C` in backend terminal

### Step 2: Run This (PowerShell)

```powershell
cd backend
npm run db:migrate
```

Wait for:
```
Running migrations...
Migrations completed successfully
```

### Step 3: Add Data (PowerShell)

```powershell
psql -U postgres -d portfolio_db
```

Right-click and paste:
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);
```

Press Enter, then type `\q` and press Enter.

### Step 4: Start Backend Again

```powershell
cd backend
npm run dev
```

Should show:
```
Server running on http://localhost:5000
```

**No more errors!** ✅

---

## Verify

### Test 1: Check Tables
```powershell
psql -U postgres -d portfolio_db -c "\dt"
```

Should show 2 tables.

### Test 2: Check Data
```powershell
psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"
```

Should show: `3`

### Test 3: Check Backend
```powershell
curl http://localhost:5000/projects
```

Should return JSON with 3 projects.

### Test 4: Check Frontend
Open: `http://localhost:5173`
Go to Projects page - should show 3 projects.

---

## Done! 🎉

Your portfolio is now fully working with:
- ✅ Database connected
- ✅ Tables created
- ✅ Sample data loaded
- ✅ Backend running
- ✅ Frontend running
- ✅ No errors

**Enjoy your portfolio!** 🚀
