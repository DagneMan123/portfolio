# Quick Server Setup Guide

## Prerequisites
- Node.js installed
- PostgreSQL running locally
- Cloudinary account with credentials configured in `frontend/.env.local`

## Running Both Servers

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
✓ Projects table ready
✓ Contact messages table ready
✓ Testimonials table ready
✓ Database initialized successfully
```

### Terminal 2: Frontend Server
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in X ms
➜  Local:   http://localhost:5173/
```

## Verify Everything Works

1. **Backend Health Check**
   - Open http://localhost:5000/health
   - Should show: `{"status":"OK"}`

2. **Frontend Loads**
   - Open http://localhost:5173
   - Should see your portfolio homepage

3. **Image Upload Works**
   - Go to http://localhost:5173/submit-testimonial
   - Fill form and upload an image
   - Should see "Uploading..." then image preview

4. **Admin Dashboard**
   - Go to http://localhost:5173/admin/testimonials
   - Should see submitted testimonials
   - Can approve/delete them

## Database Connection

The backend connects to PostgreSQL using credentials from `backend/.env`:
- Host: `localhost`
- Port: `5432`
- Database: `portfolio_db`
- User: `postgres`
- Password: (from .env file)

If you get connection errors, verify PostgreSQL is running and credentials are correct.

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `backend/.env` has correct database credentials
- Check port 5000 is not in use

### Frontend won't start
- Check port 5173 is not in use
- Verify `frontend/.env.local` has Cloudinary credentials
- Try: `npm install` then `npm run dev`

### Image upload fails
- Verify `frontend/.env.local` has real Cloudinary credentials
- Restart frontend server after updating .env.local
- Check browser console for specific error messages

### API calls fail (ECONNREFUSED)
- Verify backend is running on http://localhost:5000
- Check frontend proxy config in `vite.config.ts`
- Verify both servers are running in separate terminals

## Environment Files

### backend/.env
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=MYlove8
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=dm5rf4yzc
CLOUDINARY_API_KEY=815842898446983
CLOUDINARY_API_SECRET=boT09_AFnNUMrNW_LrO2qfLad7g
```

### frontend/.env.local
```env
VITE_CLOUDINARY_CLOUD_NAME=dm5rf4yzc
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_upload
```

## Ports Used
- Backend: `5000`
- Frontend: `5173`
- PostgreSQL: `5432`

Make sure these ports are available on your system.
