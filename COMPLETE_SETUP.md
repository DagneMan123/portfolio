# Complete Setup Guide - Frontend, Backend & Database

## Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Check PostgreSQL is installed
psql --version
```

---

## Step 1: Database Setup

### 1.1 Start PostgreSQL Service

**Windows:**
```bash
# PostgreSQL should auto-start, or start it manually:
# Services > PostgreSQL > Start
```

**Verify PostgreSQL is running:**
```bash
psql -U postgres -c "SELECT version();"
```

### 1.2 Create Database

```bash
createdb portfolio_db
```

**Verify database created:**
```bash
psql -U postgres -l
# Should show: portfolio_db
```

### 1.3 Check Database Connection

```bash
psql -U postgres -d portfolio_db -c "SELECT 1;"
# Should return: 1
```

---

## Step 2: Backend Setup

### 2.1 Navigate to Backend

```bash
cd backend
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Create .env File

```bash
cp .env.example .env
```

### 2.4 Update .env with Database Credentials

Open `backend/.env` and update:

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=http://localhost:5173
```

**Important:** Replace `postgres` password with your actual PostgreSQL password if different.

### 2.5 Run Database Migrations

```bash
npm run db:migrate
```

**Expected output:**
```
Running migrations...
Migrations completed successfully
```

**Verify tables created:**
```bash
psql -U postgres -d portfolio_db -c "\dt"
# Should show: projects, contact_messages
```

### 2.6 Add Sample Data (Optional)

```bash
psql -U postgres -d portfolio_db
```

Then paste:
```sql
INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution', 'React, Node.js, PostgreSQL, Stripe', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
('Task Management App', 'Collaborative task management tool', 'React, Firebase, TypeScript', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
('Analytics Dashboard', 'Real-time analytics dashboard', 'Next.js, Chart.js, PostgreSQL', 'https://analytics-demo.com', 'https://github.com/username/analytics', true);

SELECT * FROM projects;
```

Press `Ctrl+D` to exit.

### 2.7 Start Backend Server

```bash
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
```

**Test backend is working:**
```bash
# In another terminal
curl http://localhost:5000/health
# Should return: {"status":"OK"}

curl http://localhost:5000/projects
# Should return: [{"id":1,"title":"E-Commerce Platform",...}]
```

---

## Step 3: Frontend Setup

### 3.1 Navigate to Frontend

```bash
cd frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Start Frontend Server

```bash
npm run dev
```

**Expected output:**
```
VITE v5.4.21  ready in 19350 ms
➜  Local:   http://localhost:5173/
```

---

## Step 4: Verify Everything Works

### 4.1 Open Frontend in Browser

```
http://localhost:5173
```

### 4.2 Test Pages

1. **Home Page**
   - Should load without errors
   - Hero section visible
   - Skills with animations

2. **Projects Page**
   - Should load projects from database
   - Shows 3 sample projects
   - No red errors in console

3. **Contact Page**
   - Fill out form
   - Submit message
   - Should save to database

4. **Light/Dark Mode**
   - Click sun/moon icon
   - Should toggle theme

### 4.3 Check Browser Console

Press `F12` to open developer tools:
- **Console tab:** Should have no red errors
- **Network tab:** Should see successful API calls to `/api/projects`

### 4.4 Verify Database Updates

After submitting contact form:

```bash
psql -U postgres -d portfolio_db -c "SELECT * FROM contact_messages;"
```

Should show your submitted message.

---

## Complete Terminal Setup

### Terminal 1 - PostgreSQL (Windows)
```bash
# PostgreSQL should be running as a service
# Verify with:
psql -U postgres -c "SELECT 1;"
```

### Terminal 2 - Backend
```bash
cd backend
npm run dev
# Output: Server running on http://localhost:5000
```

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
# Output: Local: http://localhost:5173
```

### Terminal 4 - Testing (Optional)
```bash
# Test API endpoints
curl http://localhost:5000/health
curl http://localhost:5000/projects
```

---

## Troubleshooting

### Database Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:5432`

**Fix:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# If not running, start PostgreSQL service
# Windows: Services > PostgreSQL > Start
```

### Database Not Found

**Error:** `database "portfolio_db" does not exist`

**Fix:**
```bash
createdb portfolio_db
npm run db:migrate
```

### Backend Won't Start

**Error:** `Port 5000 already in use`

**Fix:**
```bash
# Change PORT in backend/.env
PORT=5001

# Or kill process using port 5000
# Windows: netstat -ano | findstr :5000
```

### Frontend Can't Connect to Backend

**Error:** `[vite] http proxy error: /projects`

**Fix:**
```bash
# Make sure backend is running
cd backend
npm run dev

# Check backend is accessible
curl http://localhost:5000/health
```

### Migrations Failed

**Error:** `Migration failed`

**Fix:**
```bash
# Check database exists
psql -U postgres -l

# Check database is accessible
psql -U postgres -d portfolio_db -c "SELECT 1;"

# Run migrations again
npm run db:migrate
```

---

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  github VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get single project
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Contact
- `POST /contact` - Submit contact form
- `GET /contact` - Get all messages

### Health
- `GET /health` - Check backend status

---

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=http://localhost:5173
```

### Frontend (vite.config.ts)
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

---

## Quick Checklist

- [ ] PostgreSQL installed and running
- [ ] Database created: `portfolio_db`
- [ ] Backend dependencies installed: `npm install`
- [ ] Backend .env configured
- [ ] Migrations run: `npm run db:migrate`
- [ ] Backend running: `npm run dev` (port 5000)
- [ ] Frontend dependencies installed: `npm install`
- [ ] Frontend running: `npm run dev` (port 5173)
- [ ] Browser opens: `http://localhost:5173`
- [ ] Projects page loads data
- [ ] Contact form submits successfully
- [ ] No errors in browser console

---

## Success Indicators

✅ Backend shows: `Server running on http://localhost:5000`
✅ Frontend shows: `Local: http://localhost:5173`
✅ Projects page displays 3 sample projects
✅ Contact form submits without errors
✅ Database shows new contact messages
✅ Light/dark mode toggle works
✅ No red errors in browser console
✅ Network tab shows successful API calls

---

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Verify everything works
3. ✅ Customize portfolio with your information
4. ✅ Add more projects to database
5. ✅ Deploy to production

---

## Support

If you encounter issues:

1. Check all prerequisites are installed
2. Verify PostgreSQL is running
3. Check .env file has correct credentials
4. Run migrations: `npm run db:migrate`
5. Check backend is running: `curl http://localhost:5000/health`
6. Check frontend console for errors: `F12`
7. Check network tab for failed API calls

**Everything should work perfectly once all steps are completed!** 🚀
