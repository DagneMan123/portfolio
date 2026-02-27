import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './config/database.js'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'
import testimonialsRouter from './routes/testimonials.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize database tables
async function initializeDatabase() {
  try {
    console.log('Initializing database...')
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        phone VARCHAR(20),
        location VARCHAR(255),
        bio TEXT,
        profile_image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ Users table ready')

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies VARCHAR(255) NOT NULL,
        link VARCHAR(255),
        github VARCHAR(255),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ Projects table ready')

    // Create contact_messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ Contact messages table ready')

    // Create testimonials table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        author_title VARCHAR(255) NOT NULL,
        quote TEXT NOT NULL,
        image_url TEXT,
        is_approved BOOLEAN DEFAULT true,
        edit_token VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✓ Testimonials table ready')

    console.log('✓ Database initialized successfully\n')
  } catch (error) {
    console.error('Database initialization error:', error)
    process.exit(1)
  }
}

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/testimonials', testimonialsRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
async function startServer() {
  try {
    await initializeDatabase()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

