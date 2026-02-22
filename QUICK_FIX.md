# Quick Fix - Backend Errors

## TL;DR - Copy & Paste These Commands

### Step 1: Go to Backend
```bash
cd backend
```

### Step 2: Remove Old Package
```bash
npm uninstall ts-node
```

### Step 3: Install New Package
```bash
npm install --save-dev tsx
```

### Step 4: Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Step 5: Start Server
```bash
npm run dev
```

## Expected Result
```
Server running on http://localhost:5000
```

## Done! ✅

No more warnings or errors!

---

## What Was Wrong?

- ❌ ts-node doesn't work well with Node.js v22
- ❌ Experimental loader warnings
- ❌ Deprecated fs.Stats API

## What's Fixed?

- ✅ tsx is modern and stable
- ✅ No warnings
- ✅ Built-in watch mode
- ✅ Works perfectly with Node.js v22

---

## If It Still Doesn't Work

### Option 1: Full Clean Install
```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

### Option 2: Check Node Version
```bash
node --version
```
(Should be v18+, you have v22 ✅)

### Option 3: Check Database
```bash
npm run db:migrate
```

---

## Commands Reference

```bash
# Development
npm run dev              # Start with auto-reload

# Production
npm run build            # Compile TypeScript
npm start                # Run compiled code

# Database
npm run db:migrate       # Create tables

# Install
npm install              # Install all packages
npm install --save-dev   # Install dev package
```

---

## Files Changed

✅ `backend/package.json` - Updated scripts and dependencies
✅ `backend/FIX_ERRORS.md` - Detailed explanation

---

## Next Steps

1. Run the 5 commands above
2. Backend should start without errors
3. Frontend should connect to backend
4. You're done! 🚀
