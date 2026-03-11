# Add Professional Testimonials

This guide explains how to add professional testimonials to your database.

## Option 1: Using the Script (Recommended)

### Step 1: Run the Script
```bash
cd backend
npx ts-node add-testimonials.ts
```

This will add 6 professional testimonials to your database automatically.

### Step 2: Verify
- Go to `/testimonials` page
- You should see the new testimonials displayed

## Option 2: Manual Entry

### Step 1: Go to Submit Page
- Navigate to `/submit-testimonial`

### Step 2: Fill Form
- **Name**: Enter the person's name
- **Title**: Enter their job title
- **Testimonial**: Write their feedback
- **Photo**: Upload a profile picture

### Step 3: Submit
- Click "Submit Testimonial"
- You'll get an edit link to modify later

## Option 3: Direct Database Insert

If you prefer to add testimonials directly to the database:

```sql
INSERT INTO testimonials (author_name, author_title, quote, image_url, edit_token, is_approved)
VALUES (
  'Name',
  'Job Title',
  'Their feedback here...',
  'image_url_here',
  'random_token_here',
  true
);
```

## Editing Testimonials

Each testimonial has an edit link. Users can:
1. Click the edit link from their email
2. Update their testimonial
3. Save changes

## Professional Testimonials Included

The script adds testimonials from:
- Sarah Johnson (Product Manager)
- Michael Chen (CTO)
- Emma Rodriguez (Business Analyst)
- David Thompson (Startup Founder)
- Lisa Anderson (Travel Director)
- James Wilson (Content Director)

All testimonials are pre-approved and will appear immediately on the testimonials page.
