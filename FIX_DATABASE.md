# Fix Database Error - "relation projects does not exist"

## Problem
```
Error fetching projects: error: relation "projects" does not exist
```

This means the database tables weren't created.

## Solution - Run Migrations

### Step 1: Stop Backend
Press `Ctrl+C` in the backend terminal

### Step 2: Run Migrations

**PowerShell (Windows):**
```powershell
cd backend
npm run db:migrate
```

**Expected Output:**
```
Running migrations...
Migrations completed successfully
```

### Step 3: Verify Tables Created

**PowerShell:**
```powershell
psql -U postgres -d portfolio_db -c "\dt"
```

**Expected Output:**
```
          List of relations
 Schema |       Name       | Type  | Owner
--------+------------------+-------+----------
 public | contact_messages | table | postgres
 public | projects         | table | postgres
```

### Step 4: Add Sample Data

**PowerShell:**
```powershell
psql -U postgres -d portfolio_db
```

Then paste this and press Enter:
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);
```

Press Enter, then type `\q` and press Enter to exit.

### Step 5: Verify Data Inserted

**PowerShell:**
```powershell
psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"
```

**Expected Output:**
```
 count
-------
     3
(1 row)
```

### Step 6: Start Backend Again

**PowerShell:**
```powershell
cd backend
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
```

No more errors!

---

## Complete Fix (Copy & Paste)

### Terminal 1 - Run Migrations

```powershell
cd backend
npm run db:migrate
```

Wait for: `Migrations completed successfully`

### Terminal 2 - Add Sample Data

```powershell
psql -U postgres -d portfolio_db
```

Paste:
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);
```

Press Enter, then `\q` to exit.

### Terminal 3 - Start Backend

```powershell
cd backend
npm run dev
```

---

## Verify It Works

### Check 1: Backend Running
```powershell
curl http://localhost:5000/health
```
Should return: `{"status":"OK"}`

### Check 2: Backend Can Get Projects
```powershell
curl http://localhost:5000/projects
```
Should return JSON with 3 projects

### Check 3: Frontend
Open: `http://localhost:5173`
Go to Projects page - should show 3 projects

---

## If Still Getting Errors

### Error: "database portfolio_db does not exist"
```powershell
createdb portfolio_db
npm run db:migrate
```

### Error: "FATAL: Ident authentication failed"
Update `backend/.env`:
```
DB_PASSWORD=postgres
```

### Error: "psql: command not found"
PostgreSQL not in PATH. Restart terminal or add to PATH.

### Error: "relation still does not exist"
```powershell
# Check migrations ran
psql -U postgres -d portfolio_db -c "\dt"

# If no tables, run again
npm run db:migrate
```

---

## PowerShell vs CMD

If you're using **CMD** instead of PowerShell:

```cmd
cd backend
npm run db:migrate
psql -U postgres -d portfolio_db -c "\dt"
```

Same commands work in both.

---

## Summary

1. ✅ Run migrations: `npm run db:migrate`
2. ✅ Add sample data: `psql -U postgres -d portfolio_db` then paste SQL
3. ✅ Verify tables: `psql -U postgres -d portfolio_db -c "\dt"`
4. ✅ Start backend: `npm run dev`
5. ✅ Open frontend: `http://localhost:5173`

**Done!** No more database errors! 🎉
