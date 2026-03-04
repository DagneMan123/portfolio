# Email Configuration Guide

## Overview
Your portfolio uses **Gmail SMTP** to send contact form emails. When someone submits the contact form, the backend receives the data and sends you an email notification.

---

## Current Setup

### Environment Variables (backend/.env)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=aydenfudagne@gmail.com
EMAIL_PASS=wbct pscw ujdb ootx
```

**What each means:**
- `EMAIL_HOST`: Gmail's SMTP server address
- `EMAIL_PORT`: 587 is the standard TLS port for SMTP
- `EMAIL_USER`: Your Gmail address (sender)
- `EMAIL_PASS`: App-specific password (NOT your regular Gmail password)

---

## How It Works (Flow)

```
User fills Contact Form
        ↓
Frontend sends POST to /api/contact
        ↓
Backend receives form data
        ↓
Backend connects to Gmail SMTP
        ↓
Email sent to your inbox
        ↓
Success message shown to user
```

---

## Step 1: Set Up Gmail App Password

Gmail requires an **App Password** instead of your regular password for security.

### Instructions:

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Click "Generate"
   - Copy the 16-character password
   - Update `EMAIL_PASS` in your `.env` file

**Current password in your .env:** `wbct pscw ujdb ootx` (already set up)

---

## Step 2: Install Email Package

You need `nodemailer` to send emails. Install it:

```bash
cd backend
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## Step 3: Create Email Service

Create `backend/src/services/emailService.ts`:

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendContactEmail(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string
) {
  try {
    // Email to you (admin)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>I received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}
```

---

## Step 4: Create Contact Route

Create `backend/src/routes/contact.ts`:

```typescript
import express from 'express'
import pool from '../config/database.js'
import { sendContactEmail } from '../services/emailService.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validate
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields required' })
    }

    // Save to database
    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject, message]
    )

    // Send emails
    await sendContactEmail(name, email, phone, subject, message)

    res.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router
```

---

## Step 5: Update Backend Index

In `backend/src/index.ts`, the contact route is already imported:

```typescript
import contactRouter from './routes/contact.js'
// ...
app.use('/api/contact', contactRouter)
```

This is already in place, so no changes needed.

---

## Testing Email

### Test with curl:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Expected Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## Troubleshooting

### "Invalid login" error
- Check your App Password is correct
- Ensure 2FA is enabled on your Gmail account
- Regenerate the App Password

### "Connection timeout"
- Check internet connection
- Verify `EMAIL_HOST` and `EMAIL_PORT` are correct
- Gmail SMTP might be blocked by firewall

### "Email not received"
- Check spam/junk folder
- Verify sender email in `.env` matches Gmail account
- Check email logs in backend console

---

## Security Notes

⚠️ **Never commit `.env` to Git** - it contains sensitive credentials

Your `.env` is already in `.gitignore`, so you're safe.

---

## Alternative Email Providers

If you want to use a different provider:

| Provider | Host | Port | Notes |
|----------|------|------|-------|
| Gmail | smtp.gmail.com | 587 | Requires App Password |
| SendGrid | smtp.sendgrid.net | 587 | API key based |
| Mailgun | smtp.mailgun.org | 587 | Domain verification needed |
| AWS SES | email-smtp.region.amazonaws.com | 587 | AWS account required |

---

## Next Steps

1. ✅ Install nodemailer: `npm install nodemailer @types/nodemailer`
2. ✅ Create email service file
3. ✅ Create contact route
4. ✅ Test the endpoint
5. ✅ Deploy to production

