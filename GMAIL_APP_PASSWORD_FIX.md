# Gmail App Password Fix

## Problem
Gmail rejected your credentials with error: `535-5.7.8 Username and Password not accepted`

This means your App Password is either:
- Expired
- Incorrect
- Not generated properly

## Solution: Generate New App Password

### Step 1: Go to Google Account Security
1. Open https://myaccount.google.com/security
2. Sign in with your Gmail account (aydenfudagne@gmail.com)

### Step 2: Enable 2-Step Verification (if not already done)
1. Look for "2-Step Verification" section
2. If it says "Not set up", click it and follow the steps
3. If already enabled, skip to Step 3

### Step 3: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. You should see a dropdown menu asking:
   - "Select the app you're using" → Choose **Mail**
   - "Select the device you're using" → Choose **Windows Computer**
3. Click **Generate**
4. Google will show you a 16-character password like: `xxxx xxxx xxxx xxxx`
5. **Copy this password exactly** (including spaces)

### Step 4: Update Your .env File
Replace the old password in `backend/.env`:

```
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

With your new 16-character password from Step 3.

### Step 5: Restart Your Server
Stop the backend server and start it again. The new password should work.

---

## Troubleshooting

### "App passwords not available"
- 2-Step Verification is not enabled
- Go to https://myaccount.google.com/security
- Enable "2-Step Verification" first

### "Still getting authentication error"
- Make sure you copied the ENTIRE 16-character password (with spaces)
- Don't add extra spaces or characters
- Restart the server after updating .env

### "Less secure app access" message
- Google has deprecated this setting
- Use App Passwords instead (the method above)

---

## Current Status
Your email configuration is set up correctly. You just need a valid App Password.

Once you update the password and restart the server, emails will send successfully.
