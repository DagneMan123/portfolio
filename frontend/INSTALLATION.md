# Frontend Installation Guide

## Required Modules

All modules needed for the frontend are listed in `package.json`. Here's what gets installed:

### Core Dependencies

```json
{
  "react": "^18.2.0",           // React library
  "react-dom": "^18.2.0",       // React DOM rendering
  "axios": "^1.6.0",            // HTTP client for API calls
  "react-router-dom": "^6.20.0" // Client-side routing
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.2.0",           // TypeScript types for React
  "@types/react-dom": "^18.2.0",       // TypeScript types for React DOM
  "@vitejs/plugin-react": "^4.2.0",    // Vite plugin for React
  "typescript": "^5.3.0",              // TypeScript compiler
  "vite": "^5.0.0",                    // Build tool and dev server
  "tailwindcss": "^3.3.0",             // CSS framework
  "postcss": "^8.4.0",                 // CSS processor
  "autoprefixer": "^10.4.0"            // PostCSS plugin for vendor prefixes
}
```

## Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install All Dependencies
```bash
npm install
```

This single command installs all modules listed in `package.json`:
- React and React DOM
- Axios for API communication
- React Router for navigation
- TypeScript and type definitions
- Vite for development and building
- Tailwind CSS for styling
- PostCSS and Autoprefixer for CSS processing

### 3. Verify Installation
```bash
npm list
```

You should see output showing all installed packages.

## What Each Module Does

### React (^18.2.0)
- Core React library for building UI components
- Provides hooks like `useState`, `useContext`, etc.

### React DOM (^18.2.0)
- Renders React components to the DOM
- Used in `main.tsx` to mount the app

### Axios (^1.6.0)
- HTTP client for making API requests
- Used in components to fetch projects and submit contact forms
- Configured to proxy requests to backend at `/api`

### React Router DOM (^6.20.0)
- Client-side routing library
- Enables navigation between pages without full page reload
- Used for: Home, About, Projects, Experience, Contact pages

### TypeScript (^5.3.0)
- Adds static type checking to JavaScript
- Provides better IDE support and error detection
- All `.tsx` and `.ts` files use TypeScript

### Vite (^5.0.0)
- Fast build tool and development server
- Replaces Create React App for faster development
- Commands: `npm run dev`, `npm run build`, `npm run preview`

### Tailwind CSS (^3.3.0)
- Utility-first CSS framework
- Provides pre-built classes for styling
- Configured in `tailwind.config.js`
- Supports dark mode with `dark:` prefix

### PostCSS (^8.4.0)
- CSS processor that transforms CSS
- Works with Tailwind to generate optimized CSS

### Autoprefixer (^10.4.0)
- Adds vendor prefixes to CSS for browser compatibility
- Ensures styles work across different browsers

## Project Structure After Installation

```
frontend/
├── node_modules/              # All installed packages (created by npm install)
├── src/
│   ├── components/            # Reusable React components
│   ├── pages/                 # Page components
│   ├── context/               # React Context (ThemeContext)
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── index.html                 # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies list
├── package-lock.json          # Locked dependency versions
└── INSTALLATION.md            # This file
```

## Available Scripts

After installation, you can run these commands:

### Development
```bash
npm run dev
```
- Starts Vite dev server on `http://localhost:5173`
- Hot module replacement (HMR) for instant updates
- Proxy to backend at `http://localhost:5000`

### Build for Production
```bash
npm run build
```
- Compiles TypeScript
- Bundles and minifies code with Vite
- Optimizes CSS with Tailwind
- Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing before deployment

### Linting
```bash
npm run lint
```
- Checks code for errors and style issues

## Troubleshooting

### Module Not Found Errors
If you get "module not found" errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
If port 5173 is already in use:
```bash
# Vite will automatically use the next available port
npm run dev
```

### Tailwind Styles Not Showing
- Ensure `index.css` is imported in `main.tsx`
- Check that `tailwind.config.js` includes the correct content paths
- Restart dev server after config changes

### TypeScript Errors
- Run `npm run build` to see all type errors
- Check `tsconfig.json` for compiler options
- Ensure all imports have proper type definitions

## Environment Setup

### Node.js Version
- Required: Node.js 18 or higher
- Check version: `node --version`

### Package Manager
- npm (comes with Node.js)
- Or use yarn: `yarn install`

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open browser to `http://localhost:5173`
4. Make sure backend is running on `http://localhost:5000`
5. Start developing!

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Axios Documentation](https://axios-http.com)
