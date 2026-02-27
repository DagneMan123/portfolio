import { Router, Request, Response } from 'express'
import pool from '../config/database.js'

const router = Router()

// Get all projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// Get single project
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// Create project (admin only in production)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, technologies, link, github } = req.body

    if (!title || !description || !technologies) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      'INSERT INTO projects (title, description, technologies, link, github) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, technologies, link, github]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// Update project
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, technologies, link, github } = req.body

    const result = await pool.query(
      'UPDATE projects SET title = $1, description = $2, technologies = $3, link = $4, github = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, description, technologies, link, github, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({ error: 'Failed to update project' })
  }
})

// Delete project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router
