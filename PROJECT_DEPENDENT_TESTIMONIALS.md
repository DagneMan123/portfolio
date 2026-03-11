# Project-Dependent Testimonials Setup

## What Changed

Testimonials are now linked to specific projects. Each testimonial can be associated with a project, and the case study pages will only show testimonials for that specific project.

## Database Changes

The `testimonials` table now includes a `project_id` field:

```sql
ALTER TABLE testimonials ADD COLUMN project_id INTEGER;
```

## Backend Changes

### API Endpoints Updated

1. **GET /api/testimonials/public** - Now accepts optional `projectId` query parameter
   - Without projectId: Returns all approved testimonials
   - With projectId: Returns only testimonials for that project
   
   Example: `GET /api/testimonials/public?projectId=1`

2. **POST /api/testimonials** - Now accepts optional `project_id` in request body
   ```json
   {
     "author_name": "John Doe",
     "author_title": "CEO",
     "quote": "Great work!",
     "image_url": "...",
     "project_id": 1
   }
   ```

3. **PUT /api/testimonials/:id** - Now accepts optional `project_id` in request body

## Frontend Changes

### CaseStudyDetail Component
- Now fetches testimonials filtered by project ID
- Displays only testimonials related to the current project
- Shows "No testimonials yet" message if none exist for the project

### TestimonialForm Component
- Added project selector dropdown
- Users can select which project their testimonial is about
- Project selection is optional (defaults to 0 = no project)

### Project IDs
```
1 = E-Commerce Platform
2 = Task Management App
3 = Analytics Dashboard
4 = Social Media App
5 = Weather Application
6 = Blog Platform
```

## How to Use

### Step 1: Run Database Migration
```bash
cd backend
npm run migrate
```

This will add the `project_id` column to the testimonials table.

### Step 2: Submit Testimonials with Project

When users submit testimonials via the form, they can now select which project the testimonial is about.

### Step 3: View Project-Specific Testimonials

When viewing a case study (e.g., `/projects/1`), only testimonials with `project_id = 1` will be displayed.

## Adding Testimonials Programmatically

If you want to add testimonials with project associations, you can use the API:

```bash
curl -X POST http://localhost:5000/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "author_name": "Sarah Johnson",
    "author_title": "Product Manager",
    "quote": "Excellent work on the e-commerce platform!",
    "project_id": 1
  }'
```

## Notes

- Testimonials without a project_id (null) will appear on the general testimonials page but not on specific case study pages
- The project selector in the form is optional - users can submit testimonials without selecting a project
- Existing testimonials will have project_id = null until updated
