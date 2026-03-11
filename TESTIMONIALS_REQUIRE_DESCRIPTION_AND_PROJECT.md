# Testimonials Require Description AND Project

## Requirements for Case Study Display

Testimonials on case study pages now require BOTH:
1. **Description** - What the person worked on (must have text)
2. **Project ID** - Which project (must be 1-6, not 0)

If either is missing, the testimonial will NOT appear on case study pages.

## How It Works

### Testimonial Submission

User fills out form:
- Full Name (required)
- Job Title (required)
- **Project** (required for case study display - must select 1-6)
- **Project Description** (required for case study display - must have text)
- Your Testimonial (required)
- Profile Photo (optional)

### Display Logic

**On Case Study Pages:**
```javascript
testimonials.filter(t => 
  t.description && t.description.length > 0 &&  // Has description
  t.project_id && t.project_id > 0              // Has project (1-6)
)
```

Only testimonials with BOTH conditions appear.

**On General Testimonials Page:**
- Shows ALL testimonials (no filtering)
- Works with or without description/project

## Examples

### ✓ Appears on Case Study
```
project_id: 1
description: "Worked on payment integration"
quote: "Great work!"
```

### ✗ Does NOT appear on Case Study
```
project_id: 0 (no project selected)
description: "Worked on payment integration"
quote: "Great work!"
```

### ✗ Does NOT appear on Case Study
```
project_id: 1
description: "" (empty description)
quote: "Great work!"
```

### ✗ Does NOT appear on Case Study
```
project_id: 0 (no project)
description: "" (no description)
quote: "Great work!"
```

## Project IDs

```
0 = No project (general testimonial)
1 = E-Commerce Platform
2 = Task Management App
3 = Analytics Dashboard
4 = Social Media App
5 = Weather Application
6 = Blog Platform
```

## User Flow

### From Case Study Page
1. Click "Share Your Testimonial"
2. Project auto-selected (1-6)
3. Must fill in description
4. Submit
5. Appears on case study page

### From General Testimonials Page
1. Click "Share Your Testimonial"
2. Project optional (can be 0)
3. Description optional
4. Submit
5. Appears on general testimonials page only

## Testing

**Test 1: With Description + Project**
1. Go to `/projects/1`
2. Click "Share Your Testimonial"
3. Fill in description and testimonial
4. Submit
5. ✓ Appears on E-Commerce case study

**Test 2: Without Description**
1. Go to `/projects/1`
2. Click "Share Your Testimonial"
3. Leave description empty
4. Submit
5. ✗ Does NOT appear on case study
6. ✓ Appears on general testimonials page

**Test 3: Without Project**
1. Go to `/submit-testimonial` (general page)
2. Leave project as "Select a project"
3. Fill in description and testimonial
4. Submit
5. ✗ Does NOT appear on any case study
6. ✓ Appears on general testimonials page

## Database Requirements

Testimonials table must have:
- `description` column (TEXT, can be NULL)
- `project_id` column (INTEGER, can be NULL)
- `is_approved` column (BOOLEAN)

Run migration if needed:
```bash
cd backend
npm run migrate
```

## Features

- ✓ Requires both description AND project for case study display
- ✓ Flexible for general testimonials
- ✓ Auto-selects project from case study page
- ✓ Clear filtering logic
- ✓ Backward compatible
