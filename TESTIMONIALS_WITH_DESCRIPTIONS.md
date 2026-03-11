# Testimonials with Project Descriptions

## What's New

Testimonials now support project descriptions. Each testimonial can include:
- **Project ID**: Which project the testimonial is about
- **Description**: What the person worked on in that project

## Database Changes

Added `description` column to testimonials table:

```sql
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS description TEXT;
```

## How It Works

### Submitting a Testimonial

When users submit a testimonial, they can now:
1. Select a project (optional)
2. Add a project description (optional) - what they worked on
3. Write their testimonial quote
4. Upload a profile photo

### Viewing Testimonials

On case study pages, testimonials display:
1. Project description (if provided) - in italics at the top
2. Testimonial quote - the main feedback
3. Author name and title
4. Edit link

### Example

**Project Description**: "Worked on the e-commerce platform's payment integration and checkout flow"

**Testimonial Quote**: "The new platform exceeded our expectations. Not only is it faster and more user-friendly, but the sales increase has been remarkable."

## Database Schema

```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  project_id INTEGER,
  author_name VARCHAR(255) NOT NULL,
  author_title VARCHAR(255) NOT NULL,
  quote TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  edit_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### GET /api/testimonials/public?projectId=1
Returns testimonials for a specific project with descriptions

### POST /api/testimonials
```json
{
  "author_name": "John Doe",
  "author_title": "CEO",
  "quote": "Great work!",
  "description": "Worked on the payment system",
  "project_id": 1,
  "image_url": "..."
}
```

### PUT /api/testimonials/:id
Update testimonial including description and project

## Setup

1. Run migration:
```bash
cd backend
npm run migrate
```

2. Restart backend:
```bash
npm run dev
```

3. Refresh frontend

## Features

- ✓ Project-specific testimonials
- ✓ Project descriptions
- ✓ Backward compatible (works with old testimonials)
- ✓ Optional fields (description and project_id)
- ✓ Edit testimonials with descriptions
- ✓ Display descriptions on case study pages
