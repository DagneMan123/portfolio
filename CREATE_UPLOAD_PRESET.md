# Create Cloudinary Upload Preset - Step by Step

## The Problem
You're getting "Upload preset not found" error because the preset doesn't exist in your Cloudinary account.

## The Solution
Create an unsigned upload preset in Cloudinary.

---

## Step-by-Step Instructions

### Step 1: Log In to Cloudinary
1. Go to https://cloudinary.com/console
2. Log in with your account

### Step 2: Go to Settings
1. Look at the bottom left of the page
2. Click the **Settings** icon (gear icon)
3. Or go directly to: https://cloudinary.com/console/settings/upload

### Step 3: Go to Upload Tab
1. Click the **Upload** tab at the top
2. Scroll down to find **Upload presets** section

### Step 4: Add Upload Preset
1. Click **Add upload preset** button
2. A form will appear

### Step 5: Configure the Preset
Fill in these fields:

**Name:** `unsigned`
- This MUST match exactly what's in your `.env.local`
- Use lowercase, no spaces

**Signing Mode:** Select **Unsigned**
- This is VERY IMPORTANT
- Don't select "Signed"
- Must be "Unsigned"

**Other settings:** Leave as default

### Step 6: Save
1. Click **Save** button
2. You should see "unsigned" in the Upload presets list
3. Status should show as "Active"

### Step 7: Verify
1. Go back to Upload presets
2. You should see "unsigned" listed
3. Click on it to verify settings
4. Confirm "Signing Mode" is "Unsigned"

---

## Update Your .env.local

Make sure `frontend/.env.local` has:
```env
VITE_CLOUDINARY_CLOUD_NAME=dm5rf4yzc
VITE_CLOUDINARY_UPLOAD_PRESET=unsigned
```

The preset name MUST match exactly (case-sensitive).

---

## Restart Frontend

After creating the preset:
```bash
cd frontend
npm run dev
```

---

## Test Upload

1. Go to http://localhost:5173/submit-testimonial
2. Fill in the form
3. Upload an image
4. Should see "✅ Image uploaded successfully"

---

## If It Still Doesn't Work

### Check 1: Preset Name Matches
- In Cloudinary: `unsigned`
- In .env.local: `unsigned`
- Must be EXACTLY the same (case-sensitive)

### Check 2: Signing Mode is "Unsigned"
1. Go to Cloudinary Settings → Upload
2. Click on "unsigned" preset
3. Verify "Signing Mode" is set to "Unsigned"
4. NOT "Signed"

### Check 3: Preset is Active
1. Go to Cloudinary Settings → Upload
2. Look at Upload presets list
3. "unsigned" should show as "Active"
4. NOT "Disabled"

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

## Screenshots Guide

### Where to Find Settings
```
Cloudinary Dashboard
    ↓
Bottom Left Corner
    ↓
Settings Icon (gear)
    ↓
Upload Tab
    ↓
Upload presets section
```

### What to Look For
```
Upload presets
├─ unsigned (Active) ← This is what you want
│  └─ Signing Mode: Unsigned
└─ [Add upload preset] button
```

---

## Troubleshooting

### Issue: Can't find Upload presets section
**Solution:**
1. Make sure you're in Settings (gear icon)
2. Make sure you're in Upload tab
3. Scroll down - it's below "Upload mappings"
4. Try refreshing the page

### Issue: Preset shows as "Disabled"
**Solution:**
1. Click on the preset name
2. Look for toggle or "Enable" button
3. Make sure it's set to "Active"
4. Save changes

### Issue: Signing Mode shows "Signed"
**Solution:**
1. Click on the preset name
2. Change "Signing Mode" to "Unsigned"
3. Save changes

### Issue: Still getting "preset not found" error
**Solution:**
1. Double-check preset name matches exactly
2. Verify preset is "Active" (not disabled)
3. Verify "Signing Mode" is "Unsigned"
4. Restart frontend server
5. Clear browser cache
6. Try again

---

## Quick Checklist

- [ ] Logged into Cloudinary
- [ ] Went to Settings → Upload
- [ ] Clicked "Add upload preset"
- [ ] Named it "unsigned"
- [ ] Set Signing Mode to "Unsigned"
- [ ] Clicked Save
- [ ] Preset appears in list as "Active"
- [ ] Updated .env.local with "unsigned"
- [ ] Restarted frontend server
- [ ] Cleared browser cache
- [ ] Hard refreshed page
- [ ] Tested image upload

---

## Success!

Once you see "✅ Image uploaded successfully", your Cloudinary setup is complete!

You can now:
1. Submit testimonials with images
2. Images upload to Cloudinary
3. Images display on testimonials page
