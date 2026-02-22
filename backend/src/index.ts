import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './config/database.js'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize database tables
async function initializeDatabase() {
  try {
    console.log('Initializing database...')
    
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

    // Insert sample data if projects table is empty
    const result = await pool.query('SELECT COUNT(*) FROM projects')
    const count = parseInt(result.rows[0].count)
    
    if (count === 0) {
      console.log('Adding sample projects...')
      await pool.query(`
        INSERT INTO projects (title, description, technologies, link, github, featured) VALUES
        ('E-Commerce Platform', 'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.', 'React, Node.js, PostgreSQL, Stripe, Tailwind CSS', 'https://ecommerce-demo.com', 'https://github.com/username/ecommerce', true),
        ('Task Management App', 'Collaborative task management tool with real-time updates, team collaboration features, advanced filtering, and progress tracking.', 'React, Firebase, TypeScript, Tailwind CSS', 'https://taskapp-demo.com', 'https://github.com/username/taskapp', true),
        ('Analytics Dashboard', 'Real-time analytics dashboard with interactive data visualization, custom reports generation, and performance metrics tracking.', 'Next.js, Chart.js, PostgreSQL, Express', 'https://analytics-demo.com', 'https://github.com/username/analytics', true)
      `)
      console.log('✓ Sample projects added')
    } else {
      console.log(`✓ Database has ${count} projects`)
    }

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
app.use('/projects', projectsRouter)
app.use('/contact', contactRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
