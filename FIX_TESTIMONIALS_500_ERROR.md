# Fix Testimonials 500 Error

## Problem
Getting "Failed to load testimonials (Status: 500)" error when viewing case studies.

## Solution

The issue is that the `project_id` column doesn't exist in the testimonials table yet. The backend now handles this gracefully, but you need to add the column.

### Option 1: Run Migration (Recommended)

```bash
cd backend
npm run migrate
```

This will automatically add the `project_id` column if it doesn't exist.

### Option 2: Manual SQL

If migration doesn't work, run this SQL directly in your database:

```sql
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS project_id INTEGER;
```

### Option 3: Restart Backend

After running the migration, restart your backend server:

```bash
cd backend
npm run dev
```

## What Changed

The backend now:
1. Checks if `project_id` column exists on startup
2. Dynamically builds SQL queries based on column availability
3. Works with both old and new database schemas
4. Gracefully handles missing columns

## Verification

After fixing:
1. Restart backend server
2. Refresh the case study page
3. Testimonials should load without errors

## If Still Getting Error

Check backend console for detailed error messages. Common issues:
- Database connection failed
- Migration script didn't run
- Column still doesn't exist

Run migration again and restart the server.
