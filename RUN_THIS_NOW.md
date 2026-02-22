# RUN THIS NOW - One Command Fix

## Your Problem
Backend is running but database tables don't exist.

## Solution - Copy & Paste These Commands

### Command 1: Stop Backend
Press `Ctrl+C` in the backend terminal where it says "Server running on http://localhost:5000"

---

### Command 2: Run Migrations

Copy this entire command and paste it in PowerShell:

```powershell
cd C:\Users\Hena\Desktop\portfolio\backend; npm run db:migrate
```

**Wait for output:**
```
Running migrations...
Migrations completed successfully
```

---

### Command 3: Add Sample Data

Copy this entire command and paste it in PowerShell:

```powershell
psql -U postgres -d portfolio_db -c "INSERT INTO projects (title, description, technologies, link, github, featured) VALUES ('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true), ('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true), ('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);"
```

**Wait for it to complete (no output = success)**

---

### Command 4: Verify Data Added

Copy this and paste:

```powershell
psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"
```

**Should show:**
```
 count
-------
     3
(1 row)
```

---

### Command 5: Start Backend Again

Copy this and paste:

```powershell
cd C:\Users\Hena\Desktop\portfolio\backend; npm run dev
```

**Should show:**
```
Server running on http://localhost:5000
```

**No more errors!** ✅

---

## Verify It Works

### Test 1: Open Frontend
```
http://localhost:5173
```

### Test 2: Go to Projects Page
Click "Projects" in navbar - should show 3 projects

### Test 3: Check Console
Press F12 - should have no red errors

---

## Done! 🎉

Your portfolio is now fully working!
