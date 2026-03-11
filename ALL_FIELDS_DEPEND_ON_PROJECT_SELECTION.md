# All Fields Depend on Project Selection

## How It Works

ALL form fields now depend on selecting a project. If no project is selected, only the project dropdown is shown.

## Form Behavior

### Step 1: Select Project (Required)
- User sees ONLY the project dropdown
- Message: "Select a project (required)"
- All other fields are HIDDEN
- Shows: "👆 Please select a project above to continue"

### Step 2: After Project Selected
- Project dropdown shows selected project
- ALL other fields APPEAR:
  - Full Name (required)
  - Job Title (required)
  - Project Description (required)
  - Your Testimonial (required)
  - Profile Photo (optional)
- Submit button appears

## User Flow

### From Case Study Page

1. User on `/projects/1` (E-Commerce)
2. Clicks "Share Your Testimonial"
3. Project auto-selected as "E-Commerce Platform"
4. ALL form fields APPEAR
5. Fills in name, title, description, testimonial, photo
6. Submits
7. Testimonial appears on E-Commerce case study page

### From General Testimonials Page

1. User on `/submit-testimonial`
2. Sees ONLY project dropdown
3. Selects "Task Management App"
4. ALL form fields APPEAR
5. Fills in form
6. Submits
7. Testimonial appears on Task Management case study page

## Form Fields

**Always Visible:**
- Project (required - dropdown)

**Conditionally Visible (only when project_id > 0):**
- Full Name (required)
- Job Title (required)
- Project Description (required)
- Your Testimonial (required)
- Profile Photo (optional)

## Validation

**Project Selection:**
- Must select a project (1-6)
- Cannot submit with project_id = 0

**When Project Selected:**
- All fields become required
- Cannot submit incomplete form

## Database

Testimonials stored with:
- `project_id` (1-6, required)
- `author_name` (required)
- `author_title` (required)
- `description` (required)
- `quote` (required)
- `image_url` (optional)

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

- ✓ Project selection is required
- ✓ All other fields depend on project
- ✓ Clear step-by-step flow
- ✓ Prevents incomplete submissions
- ✓ Works with all 6 projects
- ✓ Auto-selects from case study pages

## Testing

**Test 1: No Project Selected**
1. Go to `/submit-testimonial`
2. ✓ Only project dropdown visible
3. ✓ Message: "Please select a project above to continue"
4. ✓ All other fields HIDDEN
5. ✓ Submit button HIDDEN

**Test 2: Project Selected**
1. Select "E-Commerce Platform"
2. ✓ All form fields APPEAR
3. ✓ Submit button APPEARS
4. Fill in form
5. Submit
6. ✓ Testimonial appears on E-Commerce case study

**Test 3: From Case Study**
1. Go to `/projects/2`
2. Click "Share Your Testimonial"
3. ✓ Project auto-selected
4. ✓ All form fields APPEAR
5. Fill in form
6. Submit
7. ✓ Testimonial appears on Task Management case study

**Test 4: Incomplete Form**
1. Select project
2. Fill in only name
3. Try to submit
4. ✗ Form validation prevents submission
5. Fill in all required fields
6. ✓ Submit succeeds
