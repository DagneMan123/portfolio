# Quick Start - Running Both Servers

## Prerequisites
- Node.js installed
- PostgreSQL running locally
- Backend and frontend dependencies installed

## Step 1: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
✓ Database initialized successfully
```

**Keep this terminal open!**

## Step 2: Start Frontend Server (New Terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Step 3: Access Your Portfolio

Open browser and go to: **http://localhost:5173**

## Testing the Testimonial System

1. **Submit Testimonial**: Click "Share Your Feedback" on Testimonials page
2. **View Testimonials**: Approved testimonials appear on Testimonials page
3. **Admin Dashboard**: Go to `/admin/testimonials` to approve/manage
4. **Edit Testimonial**: Use the magic link from submission email

## Troubleshooting

### Backend Connection Error
If you see: `http proxy error: /api/testimonials/public`
- Make sure backend is running on port 5000
- Check that database is connected
- Verify `.env` file has correct database credentials

### Database Connection Error
If backend won't start:
- Ensure PostgreSQL is running
- Check `.env` database credentials
- Run migration: `npm run db:migrate`

### Port Already in Use
If port 5000 or 5173 is in use:
- Change port in `.env` (backend) or `vite.config.ts` (frontend)
- Or kill the process using that port

## Environment Variables

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Common Commands

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run db:migrate   # Run database migrations
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## API Endpoints (for testing)

### Public
- GET `/api/testimonials/public` - Get approved testimonials

### User
- POST `/api/testimonials` - Submit testimonial
- GET `/api/testimonials/edit/:token` - Get testimonial by token
- PUT `/api/testimonials/:id` - Update testimonial

### Admin
- GET `/api/testimonials/admin/all` - Get all testimonials
- DELETE `/api/testimonials/:id` - Delete testimonial

## Next Steps

1. ✅ Both servers running
2. ✅ Database connected
3. ✅ Testimonial system working
4. 📝 Set up Cloudinary for image uploads
5. 🚀 Deploy to production

---

**Everything is ready to go! Happy coding!**
