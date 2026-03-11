# Conditional Project Description Field

## How It Works

The "Project Description" field now only appears when a project is selected (project_id > 0).

### Form Behavior

**When No Project Selected (project_id = 0):**
- Project dropdown shows "Select a project (optional)"
- Project Description field is HIDDEN
- User can submit testimonial without description
- Testimonial appears on general testimonials page only

**When Project Selected (project_id = 1-6):**
- Project dropdown shows selected project name
- Project Description field APPEARS
- Description field is REQUIRED
- User must fill in description to submit
- Testimonial appears on that project's case study page

## User Flow

### Scenario 1: General Testimonial (No Project)

1. User on `/submit-testimonial`
2. Leaves project as "Select a project (optional)"
3. Project Description field is HIDDEN
4. Fills in name, title, testimonial, photo
5. Submits
6. Testimonial appears on general testimonials page only

### Scenario 2: Project-Specific Testimonial

1. User on `/projects/1` (E-Commerce)
2. Clicks "Share Your Testimonial"
3. Project auto-selected as "E-Commerce Platform"
4. Project Description field APPEARS
5. Must fill in description (required)
6. Fills in name, title, description, testimonial, photo
7. Submits
8. Testimonial appears on E-Commerce case study page

### Scenario 3: Manual Project Selection

1. User on `/submit-testimonial`
2. Selects "Task Management App" from dropdown
3. Project Description field APPEARS
4. Must fill in description (required)
5. Fills in form and submits
6. Testimonial appears on Task Management case study page

## Form Fields

**Always Visible:**
- Full Name (required)
- Job Title (required)
- Project (optional - dropdown)
- Your Testimonial (required)
- Profile Photo (optional)

**Conditionally Visible:**
- Project Description (only when project_id > 0, required when visible)

## Validation

**When Submitting:**
- If project_id = 0: Description can be empty
- If project_id > 0: Description is required (must have text)

## Database

Testimonials stored with:
- `project_id` (0 for general, 1-6 for specific projects)
- `description` (NULL or empty for general, required text for projects)
- `quote` (always required)
- `author_name` (always required)
- `author_title` (always required)

## Backend Filtering

Case study pages fetch testimonials with:
```
GET /api/testimonials/public?projectId=1
```

Backend returns only testimonials where:
- `project_id = 1`
- `description IS NOT NULL AND description != ''`
- `is_approved = true`

## Features

- ✓ Description field only shows when project selected
- ✓ Description required when project selected
- ✓ Optional for general testimonials
- ✓ Clear user experience
- ✓ Prevents incomplete submissions
- ✓ Works with all 6 projects

## Testing

**Test 1: No Project Selected**
1. Go to `/submit-testimonial`
2. Leave project as "Select a project"
3. ✓ Project Description field is HIDDEN
4. Submit without description
5. ✓ Appears on general testimonials page

**Test 2: Project Selected**
1. Go to `/projects/1`
2. Click "Share Your Testimonial"
3. ✓ Project Description field APPEARS
4. Try to submit without description
5. ✗ Form validation prevents submission
6. Fill in description
7. ✓ Submit succeeds
8. ✓ Appears on E-Commerce case study

**Test 3: Manual Selection**
1. Go to `/submit-testimonial`
2. Select "Analytics Dashboard"
3. ✓ Project Description field APPEARS
4. Fill in description
5. Submit
6. ✓ Appears on Analytics Dashboard case study
