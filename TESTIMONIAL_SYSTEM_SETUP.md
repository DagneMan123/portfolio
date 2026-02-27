# Professional Testimonial System Setup Guide

## Overview
A complete testimonial management system with user submissions, admin approval, and Cloudinary image storage.

## Features
✅ User testimonial submissions with photo upload
✅ Cloudinary integration for image storage
✅ Admin dashboard for approval/editing
✅ Magic links for users to edit their own testimonials
✅ PostgreSQL database storage
✅ Responsive design for all devices

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Update .env
```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password

# CORS
CORS_ORIGIN=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Run Database Migration
```bash
npm run db:migrate
```

#### Start Backend Server
```bash
npm run dev
```

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Create .env.local
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Start Frontend Server
```bash
npm run dev
```

### 3. Cloudinary Setup

1. Create account at https://cloudinary.com
2. Get your Cloud Name from dashboard
3. Create an unsigned upload preset:
   - Go to Settings → Upload
   - Create new upload preset
   - Set "Signing Mode" to "Unsigned"
   - Copy the preset name

### 4. Database Schema

The testimonials table is automatically created with:
- `id`: Primary key
- `author_name`: User's name
- `author_title`: Job title
- `quote`: Testimonial text
- `image_url`: Cloudinary image URL
- `is_approved`: Boolean for admin approval
- `edit_token`: Unique token for editing
- `created_at`: Submission timestamp
- `updated_at`: Last update timestamp

## API Endpoints

### Public Endpoints
- `GET /api/testimonials/public` - Fetch approved testimonials

### User Endpoints
- `POST /api/testimonials` - Submit new testimonial
- `GET /api/testimonials/edit/:token` - Get testimonial by edit token
- `PUT /api/testimonials/:id` - Update testimonial

### Admin Endpoints
- `GET /api/testimonials/admin/all` - Fetch all testimonials
- `DELETE /api/testimonials/:id` - Delete testimonial

## Frontend Routes

- `/testimonials` - View approved testimonials
- `/submit-testimonial` - Submit new testimonial
- `/edit/:token` - Edit testimonial using magic link
- `/admin/testimonials` - Admin dashboard

## User Flow

### Submitting a Testimonial
1. User clicks "Share Your Feedback" button
2. Fills form with name, title, quote
3. Uploads photo (auto-uploaded to Cloudinary)
4. Submits form
5. Receives edit link via success message
6. Testimonial appears in admin dashboard (pending approval)

### Editing a Testimonial
1. User uses magic link from submission
2. Form pre-fills with existing data
3. User can update any field
4. Changes are saved immediately

### Admin Approval
1. Admin visits `/admin/testimonials`
2. Reviews pending testimonials
3. Clicks "Approve" to make public
4. Can edit or delete testimonials

## Security Notes

- Edit tokens are unique and cryptographically secure
- Cloudinary handles image security
- Database queries use parameterized statements
- CORS is configured for your domain
- Input validation on all endpoints

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials in .env
- Verify upload preset is unsigned
- Check browser console for errors

### Testimonials not appearing
- Verify testimonial is approved in admin
- Check database connection
- Ensure API endpoint is correct

### Edit link not working
- Verify token is correct
- Check if testimonial still exists
- Ensure backend is running

## File Structure

```
backend/
├── src/
│   ├── routes/
│   │   └── testimonials.ts (NEW)
│   ├── db/
│   │   └── migrate.ts (NEW)
│   └── index.ts (UPDATED)

frontend/
├── src/
│   ├── pages/
│   │   ├── Testimonials.tsx (UPDATED)
│   │   ├── SubmitTestimonial.tsx (NEW)
│   │   ├── EditTestimonial.tsx (NEW)
│   │   └── AdminTestimonials.tsx (NEW)
│   ├── components/
│   │   └── TestimonialForm.tsx (NEW)
│   ├── utils/
│   │   └── cloudinary.ts (NEW)
│   └── App.tsx (UPDATED)
└── .env.example (NEW)
```

## Next Steps

1. Set up Cloudinary account
2. Update environment variables
3. Run database migration
4. Start both servers
5. Test testimonial submission
6. Access admin dashboard
7. Approve testimonials

---

**System is production-ready and fully integrated with your portfolio!**
