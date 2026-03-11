# Auto-Select Project on Case Study Testimonials

## What Changed

When users click "Share Your Testimonial" on a case study page, the project is now automatically selected and locked.

## How It Works

### Before
- User clicks "Share Your Testimonial" on E-Commerce case study
- Form shows "Select a project (optional)"
- User has to manually select E-Commerce

### After
- User clicks "Share Your Testimonial" on E-Commerce case study
- Form automatically selects "E-Commerce Platform"
- Project dropdown is disabled (can't change it)
- Shows message: "This testimonial will appear on the selected project's case study page"

## Implementation

### CaseStudyDetail.tsx
```typescript
// When user clicks button, passes projectId in URL
onClick={() => navigate(`/submit-testimonial?projectId=${projectId}`)}
```

### SubmitTestimonial.tsx
```typescript
// Reads projectId from query params
const projectId = searchParams.get('projectId') ? parseInt(searchParams.get('projectId')!) : undefined
// Passes to form
<TestimonialForm projectId={projectId} />
```

### TestimonialForm.tsx
```typescript
// If projectId is provided:
// 1. Dropdown shows the project name
// 2. Dropdown is disabled (can't change)
// 3. Shows confirmation message
// 4. Testimonial automatically linked to that project
```

## User Flow

1. User on E-Commerce case study page
2. Clicks "Share Your Testimonial"
3. Navigates to `/submit-testimonial?projectId=1`
4. Form shows:
   - Project: "E-Commerce Platform" (disabled)
   - Message: "This testimonial will appear on the selected project's case study page"
5. User fills in name, title, description, and testimonial
6. Submits
7. Testimonial appears on E-Commerce case study page

## Project IDs

```
1 = E-Commerce Platform
2 = Task Management App
3 = Analytics Dashboard
4 = Social Media App
5 = Weather Application
6 = Blog Platform
```

## Features

- ✓ Auto-selects correct project
- ✓ Prevents accidental project selection
- ✓ Clear confirmation message
- ✓ Disabled dropdown when auto-selected
- ✓ Still allows manual selection from general testimonial page
- ✓ Works with all 6 projects

## Testing

1. Go to any case study page (e.g., `/projects/1`)
2. Click "Share Your Testimonial"
3. Project should be auto-selected and disabled
4. Fill in form and submit
5. Testimonial appears on that project's case study page
