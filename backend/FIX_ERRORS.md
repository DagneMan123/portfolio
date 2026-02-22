# Backend Error Fix Guide

## Problem
You're getting ts-node errors with Node.js v22:
```
ExperimentalWarning: `--experimental-loader` may be removed in the future
[DEP0180] DeprecationWarning: fs.Stats constructor is deprecated
```

## Solution
Replace ts-node with tsx (better TypeScript runner for Node.js v22)

## Step-by-Step Fix

### 1. Remove Old Dependencies
```bash
cd backend
npm uninstall ts-node
```

### 2. Install New Dependencies
```bash
npm install --save-dev tsx@^4.7.0
```

### 3. Verify package.json Updated
Your `package.json` should now have:
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "tsx src/db/migrate.ts"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  }
}
```

### 4. Clear node_modules and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### 5. Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
```

## What Changed

| Before | After |
|--------|-------|
| ts-node | tsx |
| `node --loader ts-node/esm` | `tsx watch` |
| Experimental warnings | No warnings |
| Deprecated APIs | Modern APIs |

## Why tsx is Better

✅ **Modern** - Built for Node.js v18+
✅ **Faster** - Better performance than ts-node
✅ **Watch Mode** - Built-in file watching with `tsx watch`
✅ **No Warnings** - No experimental loader warnings
✅ **Compatible** - Works with all Node.js versions

## Verify Everything Works

### Test 1: Start Backend
```bash
npm run dev
```
Should show: `Server running on http://localhost:5000`

### Test 2: Test API
```bash
curl http://localhost:5000/health
```
Should return: `{"status":"OK"}`

### Test 3: Run Migrations
```bash
npm run db:migrate
```
Should show: `Migrations completed successfully`

## If You Still Get Errors

### Clear Everything and Reinstall
```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

### Check Node.js Version
```bash
node --version
```
Should be v18 or higher (you have v22.17.1 ✅)

### Check npm Version
```bash
npm --version
```
Should be v9 or higher

## Production Build

When ready for production:

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

This uses the compiled JavaScript in `dist/` folder (no TypeScript runtime needed).

## Troubleshooting

### Error: "tsx not found"
```bash
npm install --save-dev tsx
```

### Error: "Cannot find module"
```bash
npm install
```

### Port 5000 already in use
Change PORT in `.env`:
```
PORT=5001
```

### Database connection error
Check `.env` file has correct credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_password
```

## Summary

✅ Replaced ts-node with tsx
✅ Updated dev script to use `tsx watch`
✅ Updated db:migrate script
✅ Removed experimental warnings
✅ Compatible with Node.js v22

Your backend should now run without any errors!
