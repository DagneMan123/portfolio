# Image Upload Fix - Complete Guide

## Problem
When trying to upload an image in the testimonial form, you get: **"Failed to upload image. Please try again."**

## Root Cause
The Cloudinary credentials are not configured in `frontend/.env.local`. The file contains placeholder values that need to be replaced with your actual Cloudinary account credentials.

---

## Solution: Step-by-Step Setup

### Step 1: Create a Cloudinary Account
1. Go to https://cloudinary.com
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Get Your Cloud Name
1. Log in to Cloudinary dashboard: https://cloudinary.com/console
2. Look at the top of the page - you'll see your **Cloud Name** (e.g., `dm5rf4yzc`)
3. Copy this value

### Step 3: Create an Upload Preset
1. In Cloudinary dashboard, go to **Settings** (gear icon)
2. Click the **Upload** tab
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Fill in:
   - **Name**: `portfolio_upload` (or any name you prefer)
   - **Signing Mode**: Select **Unsigned** (important!)
   - Click **Save**
6. Copy the preset name

### Step 4: Update frontend/.env.local
Open `frontend/.env.local` and replace the placeholder values:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_actual_preset_name
```

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dm5rf4yzc
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_upload
```

### Step 5: Restart Frontend Server
1. Stop the frontend server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Wait for it to say "ready in X ms"

### Step 6: Test Image Upload
1. Go to http://localhost:5173/submit-testimonial
2. Fill in the form fields
3. Click "Choose File" and select an image
4. You should see "Uploading..." then the image preview appears
5. Submit the form

---

## Verification Checklist

✓ Cloudinary account created  
✓ Cloud Name copied from dashboard  
✓ Upload preset created with "Unsigned" mode  
✓ `frontend/.env.local` updated with real values  
✓ Frontend server restarted  
✓ Image uploads successfully  

---

## If It Still Doesn't Work

### Check 1: Verify Environment Variables
In browser DevTools Console, run:
```javascript
console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
```

Both should show your actual values (not "your_cloud_name" or "your_upload_preset").

### Check 2: Verify Upload Preset Settings
1. Go to Cloudinary Settings → Upload
2. Click on your preset name
3. Confirm **Signing Mode** is set to **Unsigned**
4. Confirm the preset is **Active** (not disabled)

### Check 3: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Try uploading an image
4. Look for error messages - they'll tell you what's wrong

### Check 4: Verify Backend is Running
The testimonial system needs both servers running:
- Backend: `cd backend && npm run dev` (should run on http://localhost:5000)
- Frontend: `cd frontend && npm run dev` (should run on http://localhost:5173)

---

## How Image Upload Works

1. **User selects image** → File is sent to Cloudinary API
2. **Cloudinary stores image** → Returns a secure URL
3. **URL is saved** → Stored in database with testimonial
4. **Image displays** → Using the Cloudinary URL

The image is NOT stored in your database - only the URL is stored. This keeps your database small and fast.

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_CLOUDINARY_CLOUD_NAME` | Your Cloudinary account identifier | `dm5rf4yzc` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Preset name for unsigned uploads | `portfolio_upload` |

**Note:** The `VITE_` prefix tells Vite to expose these to the frontend. Backend credentials are in `backend/.env`.

---

## Common Issues

### Issue: "Cloud name not configured"
**Solution:** Check that `VITE_CLOUDINARY_CLOUD_NAME` is set in `frontend/.env.local` and the server was restarted.

### Issue: "Upload preset not configured"
**Solution:** Check that `VITE_CLOUDINARY_UPLOAD_PRESET` is set in `frontend/.env.local` and the server was restarted.

### Issue: "Upload failed with status 401"
**Solution:** Your upload preset might have "Signed" mode enabled. Change it to "Unsigned" in Cloudinary settings.

### Issue: "Upload failed with status 400"
**Solution:** The image file might be too large or in an unsupported format. Try a smaller JPG or PNG file.

---

## Next Steps

Once image uploads are working:
1. Submit a testimonial with an image
2. Go to `/admin/testimonials` to approve it
3. It will appear on the Testimonials page

All testimonials are stored in PostgreSQL database with Cloudinary image URLs.
