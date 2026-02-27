# Cloudinary Setup Guide - Image Upload Configuration

## What is Cloudinary?
Cloudinary is a cloud service for storing and managing images. It's free for small projects and handles all image uploads for the testimonial system.

## Step-by-Step Setup

### 1. Create Cloudinary Account

1. Go to https://cloudinary.com
2. Click "Sign Up Free"
3. Create account with email
4. Verify email
5. Log in to dashboard

### 2. Get Your Cloud Name

1. Go to https://cloudinary.com/console
2. Look at the top of the page
3. You'll see "Cloud Name: **your_cloud_name**"
4. Copy this value

### 3. Create Upload Preset

1. In dashboard, go to **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll down to "Upload presets"
4. Click **Add upload preset**
5. Fill in:
   - **Preset name**: `portfolio_upload` (or any name)
   - **Signing Mode**: Select **Unsigned** (important!)
   - **Folder**: `portfolio/testimonials` (optional)
6. Click **Save**
7. Copy the preset name

### 4. Update Frontend Configuration

1. Open `frontend/.env.local`
2. Replace values:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_upload
```

3. Save file
4. Restart frontend server: `npm run dev`

## Verification

### Test Upload

1. Go to http://localhost:5173/submit-testimonial
2. Fill in form
3. Click "Choose File" and select an image
4. If successful:
   - Image preview appears
   - No error message
   - Form can be submitted

### Check Browser Console

If upload fails, check browser console (F12):
- Look for error messages
- Common errors:
  - "Cloud name not configured" → Update .env.local
  - "Upload preset not configured" → Update .env.local
  - "Upload failed" → Check Cloudinary settings

### Check Cloudinary Dashboard

1. Go to https://cloudinary.com/console/media_library
2. Look for uploaded images
3. Should see images in `portfolio/testimonials` folder

## Troubleshooting

### Error: "Cloud name not configured"
**Solution**: 
- Check `frontend/.env.local` exists
- Verify `VITE_CLOUDINARY_CLOUD_NAME` is set
- Restart frontend server

### Error: "Upload preset not configured"
**Solution**:
- Check `frontend/.env.local` exists
- Verify `VITE_CLOUDINARY_UPLOAD_PRESET` is set
- Restart frontend server

### Error: "Upload failed"
**Solution**:
- Verify upload preset is set to "Unsigned"
- Check preset name matches exactly in .env.local
- Try uploading smaller image (< 5MB)
- Check browser console for detailed error

### Image uploads but doesn't appear
**Solution**:
- Check Cloudinary dashboard for image
- Verify image URL is being saved to database
- Check browser network tab for API response

## File Size Limits

- Free tier: 100MB per file
- Recommended: Keep under 5MB for testimonial photos
- Supported formats: JPG, PNG, GIF, WebP

## Security Notes

- Upload preset is "Unsigned" (safe for frontend)
- No API keys exposed in frontend code
- Images stored securely on Cloudinary
- URLs are permanent and can be used anywhere

## Environment Variables

### Required
- `VITE_CLOUDINARY_CLOUD_NAME` - Your cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Your upload preset name

### Optional (for backend)
- `CLOUDINARY_API_KEY` - For backend operations
- `CLOUDINARY_API_SECRET` - For backend operations

## Testing Checklist

- [ ] Cloudinary account created
- [ ] Cloud name copied
- [ ] Upload preset created (Unsigned)
- [ ] .env.local updated with credentials
- [ ] Frontend server restarted
- [ ] Image upload works on testimonial form
- [ ] Image appears in Cloudinary dashboard
- [ ] Testimonial saves with image URL

## Common Issues

### "CORS error" when uploading
- This is normal for Cloudinary
- Cloudinary handles CORS automatically
- If persists, check upload preset settings

### Image URL not saving to database
- Check backend is running
- Verify API endpoint is correct
- Check database connection

### Upload preset not found
- Verify preset name in .env.local matches exactly
- Check preset exists in Cloudinary dashboard
- Ensure preset is set to "Unsigned"

## Next Steps

1. ✅ Create Cloudinary account
2. ✅ Get cloud name
3. ✅ Create upload preset
4. ✅ Update .env.local
5. ✅ Restart frontend
6. ✅ Test image upload
7. 🚀 Deploy to production

## Production Deployment

When deploying to production:

1. Update environment variables on hosting platform
2. Set `VITE_CLOUDINARY_CLOUD_NAME` in build environment
3. Set `VITE_CLOUDINARY_UPLOAD_PRESET` in build environment
4. Rebuild frontend
5. Deploy

## Support

- Cloudinary Docs: https://cloudinary.com/documentation
- Upload Presets: https://cloudinary.com/documentation/upload_presets
- API Reference: https://cloudinary.com/documentation/image_upload_api_reference

---

**Image upload is now ready to use!**
