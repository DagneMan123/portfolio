# Testimonials Filtered by Project Selection

## How It Works

Testimonials on case study pages are now filtered by the **project_id** that users select when submitting a testimonial.

### User Flow

1. **User on Case Study Page** (e.g., E-Commerce Platform)
   - Clicks "Share Your Testimonial"
   - Navigates to `/submit-testimonial?projectId=1`

2. **Testimonial Form**
   - Project dropdown shows "E-Commerce Platform" (auto-selected)
   - Dropdown is disabled (can't change)
   - Shows: "✓ This testimonial will appear on the selected project's case study page"
   - User fills in name, title, description, testimonial, photo

3. **Submit Testimonial**
   - Testimonial saved with `project_id = 1`
   - Testimonial is approved and appears immediately

4. **Case Study Page Display**
   - Backend fetches: `GET /api/testimonials/public?projectId=1`
   - Only testimonials with `project_id = 1` are returned
   - All returned testimonials display on the E-Commerce case study page

### From General Testimonials Page

- Users can submit testimonials without selecting a project
- Project dropdown is enabled (not disabled)
- Users can select any project or leave it as 0 (no project)
- These testimonials appear on general testimonials page only

## Project IDs

```
1 = E-Commerce Platform
2 = Task Management App
3 = Analytics Dashboard
4 = Social Media App
5 = Weather Application
6 = Blog Platform
```

## Database

Testimonials are stored with:
- `project_id` (1-6 for specific projects, 0 for general)
- `description` (optional)
- `quote` (required)
- `author_name` (required)
- `author_title` (required)
- `image_url` (optional)

## API Filtering

### GET /api/testimonials/public?projectId=1
Returns only testimonials where:
- `is_approved = true`
- `project_id = 1`

### GET /api/testimonials/public
Returns all approved testimonials (no project filter)

## Features

- ✓ Auto-selects project from case study page
- ✓ Disables project dropdown when auto-selected
- ✓ Shows confirmation message
- ✓ Backend filters by project_id
- ✓ Works with all 6 projects
- ✓ Optional project selection from general page
- ✓ Backward compatible

## Testing

1. Go to case study page (e.g., `/projects/1`)
2. Click "Share Your Testimonial"
3. Project should be auto-selected and disabled
4. Fill in form and submit
5. Go back to case study page
6. Testimonial should appear
7. Go to different case study page
8. Testimonial should NOT appear (different project_id)

## Troubleshooting

If testimonials don't appear:
1. Check that `project_id` column exists: `npm run migrate`
2. Verify testimonials have correct `project_id` in database
3. Check backend logs for filtering errors
4. Verify testimonials have `is_approved = true`
