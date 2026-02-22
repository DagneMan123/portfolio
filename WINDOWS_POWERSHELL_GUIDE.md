# Windows PowerShell Setup Guide

## Important: PowerShell vs CMD

You're using **PowerShell**, not CMD. Some commands are different.

### PowerShell Commands Used Here

```powershell
# Navigation
cd backend              # Change directory
cd ..                   # Go up one level

# File operations
Remove-Item -Recurse -Force node_modules    # Delete folder
Remove-Item package-lock.json               # Delete file

# Running commands
npm install
npm run dev
npm run db:migrate
```

---

## Complete Setup for PowerShell

### Step 1: Create Database

```powershell
createdb portfolio_db
```

### Step 2: Backend Setup

```powershell
cd backend
npm install
npm run db:migrate
```

**Expected:**
```
Running migrations...
Migrations completed successfully
```

### Step 3: Add Sample Data

```powershell
psql -U postgres -d portfolio_db
```

Then paste (right-click to paste in PowerShell):
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);
```

Press Enter, then type `\q` and press Enter to exit psql.

### Step 4: Start Backend

```powershell
cd backend
npm run dev
```

**Expected:**
```
Server running on http://localhost:5000
```

### Step 5: Start Frontend (New PowerShell Window)

```powershell
cd frontend
npm run dev
```

**Expected:**
```
VITE v5.4.21  ready in 19350 ms
➜  Local:   http://localhost:5173/
```

### Step 6: Open Browser

```
http://localhost:5173
```

---

## PowerShell-Specific Commands

### Delete Folders (PowerShell)

**Wrong (Linux/Git Bash):**
```bash
rm -rf node_modules
```

**Correct (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules
```

Or shorter:
```powershell
rmdir /s /q node_modules
```

### Delete Files (PowerShell)

**Wrong (Linux/Git Bash):**
```bash
rm package-lock.json
```

**Correct (PowerShell):**
```powershell
Remove-Item package-lock.json
```

### List Files (PowerShell)

**Wrong (Linux/Git Bash):**
```bash
ls -la
```

**Correct (PowerShell):**
```powershell
Get-ChildItem
```

Or shorter:
```powershell
dir
```

---

## Common PowerShell Issues

### Issue 1: "rm: command not found"

**Problem:** Using Linux commands in PowerShell

**Solution:** Use PowerShell commands instead

```powershell
# Instead of: rm -rf node_modules
Remove-Item -Recurse -Force node_modules

# Instead of: rm package-lock.json
Remove-Item package-lock.json
```

### Issue 2: "Cannot paste in PowerShell"

**Solution:** Right-click to paste (Ctrl+V doesn't work by default)

1. Copy the SQL code
2. Right-click in PowerShell window
3. Select "Paste"

### Issue 3: "psql: command not found"

**Solution:** PostgreSQL not in PATH

1. Add PostgreSQL to PATH
2. Or use full path: `C:\Program Files\PostgreSQL\15\bin\psql`
3. Restart PowerShell

### Issue 4: "npm: command not found"

**Solution:** Node.js not installed or not in PATH

1. Install Node.js from nodejs.org
2. Restart PowerShell
3. Check: `node --version`

---

## Quick Reference - PowerShell Commands

| Task | Command |
|------|---------|
| Create database | `createdb portfolio_db` |
| Connect to database | `psql -U postgres -d portfolio_db` |
| List tables | `psql -U postgres -d portfolio_db -c "\dt"` |
| Run migrations | `npm run db:migrate` |
| Start backend | `npm run dev` |
| Start frontend | `npm run dev` |
| Delete folder | `Remove-Item -Recurse -Force folder_name` |
| Delete file | `Remove-Item file_name` |
| List files | `Get-ChildItem` or `dir` |
| Change directory | `cd folder_name` |
| Go up one level | `cd ..` |

---

## Step-by-Step PowerShell Setup

### Terminal 1 - Database & Backend

```powershell
# Create database
createdb portfolio_db

# Go to backend
cd backend

# Install dependencies
npm install

# Run migrations
npm run db:migrate

# Add sample data
psql -U postgres -d portfolio_db
```

Then paste SQL (right-click):
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);
```

Type `\q` and press Enter to exit.

```powershell
# Start backend
npm run dev
```

### Terminal 2 - Frontend

```powershell
cd frontend
npm run dev
```

### Terminal 3 - Browser

```
http://localhost:5173
```

---

## Verify Everything Works

### Check 1: Database Tables

```powershell
psql -U postgres -d portfolio_db -c "\dt"
```

Should show 2 tables: `projects` and `contact_messages`

### Check 2: Sample Data

```powershell
psql -U postgres -d portfolio_db -c "SELECT COUNT(*) FROM projects;"
```

Should return: `3`

### Check 3: Backend Health

```powershell
curl http://localhost:5000/health
```

Should return: `{"status":"OK"}`

### Check 4: Backend API

```powershell
curl http://localhost:5000/projects
```

Should return JSON with 3 projects

### Check 5: Frontend

Open: `http://localhost:5173`
Go to Projects page - should show 3 projects

---

## If You Get Errors

### "relation projects does not exist"
```powershell
cd backend
npm run db:migrate
```

### "database portfolio_db does not exist"
```powershell
createdb portfolio_db
cd backend
npm run db:migrate
```

### "FATAL: Ident authentication failed"
Update `backend/.env`:
```
DB_PASSWORD=postgres
```

### "Port 5000 already in use"
Update `backend/.env`:
```
PORT=5001
```

### "Cannot find module"
```powershell
cd backend
npm install
npm run dev
```

---

## Success Checklist

- [ ] Database created: `portfolio_db`
- [ ] Tables created: `projects`, `contact_messages`
- [ ] Sample data inserted: 3 projects
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Browser shows homepage
- [ ] Projects page loads 3 projects
- [ ] No errors in console

---

## PowerShell Tips

1. **Right-click to paste** - Ctrl+V doesn't work by default
2. **Use full paths** - If commands not found, use full path
3. **Restart after changes** - Close and reopen PowerShell
4. **Check PATH** - `$env:PATH` to see all paths
5. **Use backtick for line continuation** - `` ` `` at end of line

---

## Next Steps

1. ✅ Follow Step-by-Step PowerShell Setup above
2. ✅ Verify Everything Works
3. ✅ Open `http://localhost:5173`
4. ✅ Test Projects page
5. ✅ Test Contact form

**You're all set!** 🚀
