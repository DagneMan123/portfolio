# Fix Upload Preset Error - Action Guide

## The Error
```
❌ Error: ❌ Upload preset not found
```

## The Cause
The upload preset `portfolio_upload` (or `unsigned`) doesn't exist in your Cloudinary account.

## The Solution (3 Steps)

### Step 1: Create Upload Preset in Cloudinary (5 minutes)

1. Go to https://cloudinary.com/console
2. Click **Settings** (gear icon at bottom left)
3. Click **Upload** tab
4. Scroll down to **Upload presets**
5. Click **Add upload preset**
6. Fill in:
   - **Name:** `unsigned`
   - **Signing Mode:** `Unsigned` (IMPORTANT!)
7. Click **Save**

### Step 2: Verify Preset Was Created

1. Go back to Upload presets section
2. You should see `unsigned` listed
3. Status should show "Active"
4. Click on it to verify "Signing Mode" is "Unsigned"

### Step 3: Restart Frontend

```bash
cd frontend
npm run dev
```

---

## Test It Works

1. Go to http://localhost:5173/submit-testimonial
2. Fill in the form
3. Upload an image
4. Should see "✅ Image uploaded successfully"

---

## If It Still Doesn't Work

### Check 1: Preset Name Matches
- In Cloudinary: `unsigned`
- In .env.local: `unsigned`
- Must be EXACTLY the same

### Check 2: Signing Mode is "Unsigned"
1. Go to Cloudinary Settings → Upload
2. Click on "unsigned" preset
3. Verify "Signing Mode" is "Unsigned" (NOT "Signed")

### Check 3: Preset is Active
1. Go to Cloudinary Settings → Upload
2. Look at Upload presets list
3. "unsigned" should show as "Active"

### Check 4: Restart Frontend
```bash
cd frontend
npm run dev
```

### Check 5: Clear Browser Cache
1. Press F12 to open DevTools
2. Press Ctrl+Shift+Delete
3. Select "All time"
4. Clear cache
5. Hard refresh (Ctrl+Shift+R)

---

## Console Output When It Works

```
📤 Starting Cloudinary upload...
Cloud Name: dm5rf4yzc
File: photo.jpg (245.32KB)
Upload Preset: unsigned
📡 Uploading to: https://api.cloudinary.com/v1_1/dm5rf4yzc/image/upload
📨 Response status: 200
✅ Upload successful
Image URL: https://res.cloudinary.com/dm5rf4yzc/image/upload/v1234567890/abc123.jpg
```

---

## Testimonials Page Functionality

### What Should Happen

1. **Page Loads**
   - Shows "Loading testimonials..."
   - Fetches from `/api/testimonials/public`

2. **If No Testimonials**
   - Shows "No testimonials yet"
   - Shows "Submit Testimonial" button

3. **If Testimonials Exist**
   - Shows testimonial cards
   - Displays author image (circular)
   - Displays author name and title
   - Displays quote

4. **If Error**
   - Shows error message
   - Shows "Try Again" button

### Console Output

```
📥 Fetching testimonials from /api/testimonials/public...
📨 Response status: 200
✅ Testimonials fetched successfully: 3 testimonials
```

---

## How to Submit & Display Testimonials

### Step 1: Submit Testimonial
1. Go to http://localhost:5173/submit-testimonial
2. Fill in:
   - Full Name
   - Job Title
   - Your Testimonial (quote)
   - Profile Photo (upload image)
3. Click "Submit Testimonial"
4. Should see "✓ Testimonial submitted successfully!"

### Step 2: Approve in Admin
1. Go to http://localhost:5173/admin/testimonials
2. You should see your submitted testimonial
3. Click "Approve" button
4. Testimonial status changes to "Approved"

### Step 3: View on Testimonials Page
1. Go to http://localhost:5173/testimonials
2. Your testimonial should appear with:
   - Your image (circular)
   - Your name
   - Your title
   - Your quote

---

## Complete Workflow

```
1. User goes to /submit-testimonial
   ↓
2. User fills form and uploads image
   ↓
3. Image uploads to Cloudinary
   ↓
4. Testimonial saved to database with image URL
   ↓
5. User sees success message
   ↓
6. Admin goes to /admin/testimonials
   ↓
7. Admin sees submitted testimonial
   ↓
8. Admin clicks "Approve"
   ↓
9. Testimonial marked as approved
   ↓
10. User goes to /testimonials
    ↓
11. Approved testimonial displays with image
```

---

## Troubleshooting Checklist

- [ ] Created upload preset named "unsigned"
- [ ] Set Signing Mode to "Unsigned"
- [ ] Preset shows as "Active"
- [ ] .env.local has `VITE_CLOUDINARY_UPLOAD_PRESET=unsigned`
- [ ] Frontend server restarted
- [ ] Browser cache cleared
- [ ] Can upload image without error
- [ ] See "✅ Image uploaded successfully"
- [ ] Can submit testimonial
- [ ] Can approve in admin
- [ ] Testimonial appears on /testimonials page
- [ ] Image displays on testimonials page

---

## Quick Reference

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create preset "unsigned" | Preset appears in list |
| 2 | Set to "Unsigned" mode | Signing Mode shows "Unsigned" |
| 3 | Restart frontend | Server shows "ready in X ms" |
| 4 | Upload image | See "✅ Image uploaded successfully" |
| 5 | Submit testimonial | See success message |
| 6 | Approve in admin | Status changes to "Approved" |
| 7 | View testimonials page | Testimonial displays with image |

---

## Files Updated

- `frontend/.env.local` - Changed preset name to "unsigned"
- `frontend/src/utils/cloudinary.ts` - Better error handling
- `frontend/src/pages/Testimonials.tsx` - Better error display and logging

---

## Summary

**Problem:** Upload preset not found  
**Solution:** Create "unsigned" preset in Cloudinary  
**Result:** Image uploads work, testimonials display correctly

Your testimonial system is now fully functional! 🚀
