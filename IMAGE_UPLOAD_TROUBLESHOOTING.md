# Image Upload Troubleshooting Guide

## Error: "Failed to upload image. Please try again."

This error appears when the image upload to Cloudinary fails. Here's how to fix it:

## Quick Fixes (Try These First)

### 1. Check Environment Variables

**File**: `frontend/.env.local`

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

- [ ] File exists in `frontend/` directory
- [ ] Both variables are set (not empty)
- [ ] No typos in variable names
- [ ] Values don't have quotes around them

### 2. Restart Frontend Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
cd frontend
npm run dev
```

### 3. Clear Browser Cache

- Press `Ctrl+Shift+Delete` (or Cmd+Shift+Delete on Mac)
- Clear "Cached images and files"
- Refresh page

## Detailed Troubleshooting

### Step 1: Check Browser Console

1. Open browser DevTools: `F12`
2. Go to **Console** tab
3. Try uploading image again
4. Look for error message

**Common errors and solutions:**

#### Error: "Cloud name not configured"
```
Cloudinary cloud name not configured. 
Set VITE_CLOUDINARY_CLOUD_NAME in .env.local
```

**Fix**:
- Create/update `frontend/.env.local`
- Add: `VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name`
- Get cloud name from: https://cloudinary.com/console
- Restart frontend server

#### Error: "Upload preset not configured"
```
Cloudinary upload preset not configured. 
Set VITE_CLOUDINARY_UPLOAD_PRESET in .env.local
```

**Fix**:
- Create/update `frontend/.env.local`
- Add: `VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name`
- Create preset at: https://cloudinary.com/console/settings/upload
- Restart frontend server

#### Error: "Upload failed with status 401"
```
Upload failed with status 401
```

**Fix**:
- Check upload preset exists in Cloudinary
- Verify preset is set to "Unsigned"
- Check preset name matches exactly in .env.local
- Try creating new preset

#### Error: "Upload failed with status 400"
```
Upload failed with status 400
```

**Fix**:
- Check image file is valid (JPG, PNG, GIF, WebP)
- Check image size is under 100MB
- Try with different image
- Check Cloudinary account is active

### Step 2: Check Network Tab

1. Open DevTools: `F12`
2. Go to **Network** tab
3. Try uploading image
4. Look for request to `api.cloudinary.com`
5. Click on it and check:
   - **Status**: Should be 200
   - **Response**: Should contain `secure_url`

**If status is not 200**:
- Check error message in response
- Verify Cloudinary credentials
- Check upload preset settings

### Step 3: Verify Cloudinary Account

1. Go to https://cloudinary.com/console
2. Check:
   - [ ] Account is active (not suspended)
   - [ ] Cloud name is visible
   - [ ] Upload presets exist
   - [ ] Preset is set to "Unsigned"

### Step 4: Test with Cloudinary Widget

1. Go to https://cloudinary.com/console/media_library
2. Click "Upload" button
3. Try uploading image directly
4. If this works, issue is with frontend configuration
5. If this fails, issue is with Cloudinary account

## Complete Setup Checklist

- [ ] Cloudinary account created at https://cloudinary.com
- [ ] Logged into https://cloudinary.com/console
- [ ] Cloud name copied from dashboard
- [ ] Upload preset created in Settings → Upload
- [ ] Upload preset set to "Unsigned"
- [ ] `frontend/.env.local` file created
- [ ] `VITE_CLOUDINARY_CLOUD_NAME` set correctly
- [ ] `VITE_CLOUDINARY_UPLOAD_PRESET` set correctly
- [ ] Frontend server restarted after .env.local changes
- [ ] Browser cache cleared
- [ ] Tested image upload on testimonial form

## Testing Steps

### Test 1: Verify Environment Variables

Open browser console and run:
```javascript
console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
```

Both should show your values (not undefined).

### Test 2: Manual Upload Test

Create a test file `test-upload.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cloudinary Upload Test</title>
</head>
<body>
    <h1>Cloudinary Upload Test</h1>
    <input type="file" id="fileInput" accept="image/*">
    <button onclick="uploadTest()">Upload</button>
    <div id="result"></div>

    <script>
        async function uploadTest() {
            const file = document.getElementById('fileInput').files[0];
            if (!file) {
                alert('Please select a file');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'your_preset_name');

            try {
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
                    {
                        method: 'POST',
                        body: formData
                    }
                );

                const data = await response.json();
                
                if (response.ok) {
                    document.getElementById('result').innerHTML = 
                        `<p>✓ Upload successful!</p>
                         <p>URL: ${data.secure_url}</p>
                         <img src="${data.secure_url}" width="200">`;
                } else {
                    document.getElementById('result').innerHTML = 
                        `<p>✗ Upload failed: ${data.error.message}</p>`;
                }
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    `<p>✗ Error: ${error.message}</p>`;
            }
        }
    </script>
</body>
</html>
```

Replace `your_cloud_name` and `your_preset_name` with your values.

### Test 3: Check Cloudinary Dashboard

1. Go to https://cloudinary.com/console/media_library
2. Look for recently uploaded images
3. If images appear here, upload is working
4. If not, check Cloudinary account settings

## Still Not Working?

### Option 1: Check Logs

1. Open browser DevTools: `F12`
2. Go to **Console** tab
3. Look for detailed error messages
4. Copy error and search: https://cloudinary.com/documentation

### Option 2: Verify Preset Settings

1. Go to https://cloudinary.com/console/settings/upload
2. Find your preset
3. Check:
   - [ ] Signing Mode = "Unsigned"
   - [ ] Folder is set (optional)
   - [ ] Allowed file types include images
   - [ ] Preset is enabled

### Option 3: Create New Preset

1. Go to https://cloudinary.com/console/settings/upload
2. Delete old preset
3. Click "Add upload preset"
4. Name: `portfolio_upload`
5. Signing Mode: **Unsigned**
6. Save
7. Update .env.local with new name
8. Restart frontend

### Option 4: Contact Support

- Cloudinary Support: https://support.cloudinary.com
- Include:
  - Error message from console
  - Cloud name (without sensitive data)
  - Preset name
  - Image file type and size

## Prevention

To avoid upload issues in the future:

1. **Always use .env.local** for local development
2. **Always restart frontend** after changing .env.local
3. **Always verify preset is "Unsigned"** for frontend uploads
4. **Always test uploads** before deploying
5. **Keep credentials secure** - never commit .env.local to git

## Success Indicators

✅ Image upload works when:
- No error message appears
- Image preview shows in form
- Form can be submitted
- Image appears in Cloudinary dashboard
- Testimonial saves with image URL

---

**If you've completed all steps and still have issues, check the browser console for the exact error message and refer to Cloudinary documentation.**
