import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import pool from '../config/database.js'
import crypto from 'crypto'

const router = Router()

// Check if project_id and description columns exist
let hasProjectIdColumn = false
let hasDescriptionColumn = false

async function checkColumns() {
  try {
    await pool.query(`
      SELECT project_id FROM testimonials LIMIT 1
    `)
    hasProjectIdColumn = true
    console.log('✓ project_id column exists')
  } catch (error) {
    hasProjectIdColumn = false
    console.log('⚠ project_id column does not exist yet')
  }

  try {
    await pool.query(`
      SELECT description FROM testimonials LIMIT 1
    `)
    hasDescriptionColumn = true
    console.log('✓ description column exists')
  } catch (error) {
    hasDescriptionColumn = false
    console.log('⚠ description column does not exist yet')
  }
}

// Check on startup
checkColumns()

// Generate unique edit token
function generateEditToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// GET: Fetch approved testimonials (public) - MUST be before /:id route
router.get('/public', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query
    console.log(' Backend: Fetching approved testimonials...')
    console.log(' Backend: projectId param:', projectId)
    
    let query = 'SELECT id, author_name, author_title, quote, image_url, edit_token, created_at'
    const params: any[] = []
    
    if (hasProjectIdColumn) {
      query += ', project_id'
    }
    
    if (hasDescriptionColumn) {
      query += ', description'
    }
    
    query += ' FROM testimonials WHERE is_approved = true'
    
    if (projectId && hasProjectIdColumn) {
      const projectIdNum = parseInt(projectId as string)
      if (!isNaN(projectIdNum) && projectIdNum > 0) {
        query += ' AND project_id = $1'
        params.push(projectIdNum)
        console.log(' Backend: Filtering by projectId:', projectIdNum)
        
        // Also require description for case study testimonials
        if (hasDescriptionColumn) {
          query += ' AND description IS NOT NULL AND description != \'\''
          console.log(' Backend: Also requiring description (must have text)')
        }
      }
    }
    
    query += ' ORDER BY created_at DESC'
    
    const result = await pool.query(query, params)
    console.log(' Backend: Found', result.rows.length, 'approved testimonials')
    res.json(result.rows)
  } catch (error) {
    console.error(' Backend: Error fetching testimonials:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// GET: Fetch all testimonials (admin) - MUST be before /:id route
router.get('/admin/all', async (_req: Request, res: Response) => {
  try {
    console.log(' Backend: Fetching all testimonials (admin)...')
    const result = await pool.query(
      'SELECT * FROM testimonials ORDER BY created_at DESC'
    )
    console.log(' Backend: Found', result.rows.length, 'total testimonials')
    res.json(result.rows)
  } catch (error) {
    console.error(' Backend: Error fetching testimonials:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// GET: Fetch single testimonial by edit token - MUST be before /:id route
router.get('/edit/:token', async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE edit_token = $1',
      [token]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    res.status(500).json({ error: 'Failed to fetch testimonial' })
  }
})

// POST: Submit new testimonial
router.post('/', [
  body('author_name').trim().notEmpty().withMessage('Name is required'),
  body('author_title').trim().notEmpty().withMessage('Title is required'),
  body('quote').trim().notEmpty().withMessage('Quote is required'),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { author_name, author_title, quote, image_url, project_id, description } = req.body
    const edit_token = generateEditToken()

    // Ensure project_id is a number or null
    const projectIdNum = project_id ? parseInt(project_id) : null

    console.log(' Backend: Submitting new testimonial...')
    console.log('  Author:', author_name)
    console.log('  Title:', author_title)
    console.log('  Project ID:', projectIdNum || 'Not specified')
    console.log('  Description:', description || 'Not specified')
    console.log('  Image URL:', image_url ? ' Provided' : 'Not provided')

    let query = 'INSERT INTO testimonials ('
    let values = 'VALUES ('
    const params: any[] = []
    let paramCount = 1

    if (hasProjectIdColumn) {
      query += 'project_id, '
      values += '$' + paramCount + ', '
      params.push(projectIdNum || null)
      paramCount++
    }

    query += 'author_name, author_title, quote, image_url'
    values += '$' + paramCount + ', $' + (paramCount + 1) + ', $' + (paramCount + 2) + ', $' + (paramCount + 3)
    params.push(author_name, author_title, quote, image_url || null)
    paramCount += 4

    if (hasDescriptionColumn) {
      query += ', description'
      values += ', $' + paramCount
      params.push(description || null)
      paramCount++
    }

    query += ', edit_token, is_approved) '
    values += ', $' + paramCount + ', $' + (paramCount + 1) + ')'
    params.push(edit_token, true)

    const result = await pool.query(query + values + ' RETURNING *', params)

    console.log('Backend: Testimonial saved with ID:', result.rows[0].id)
    console.log(' Backend: Testimonial auto-approved and will appear immediately')

    res.status(201).json({
      message: 'Testimonial submitted successfully and approved!',
      edit_link: `/edit/${edit_token}`,
      testimonial: result.rows[0]
    })
  } catch (error) {
    console.error(' Backend: Error submitting testimonial:', error)
    res.status(500).json({ error: 'Failed to submit testimonial' })
  }
})

// PUT: Update testimonial
router.put('/:id', [
  body('author_name').trim().notEmpty().withMessage('Name is required'),
  body('author_title').trim().notEmpty().withMessage('Title is required'),
  body('quote').trim().notEmpty().withMessage('Quote is required'),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { author_name, author_title, quote, image_url, is_approved, project_id, description } = req.body

    // Ensure project_id is a number or null
    const projectIdNum = project_id ? parseInt(project_id) : null

    console.log(' Backend: Updating testimonial ID:', id)
    console.log('  Approved:', is_approved ? ' Yes' : ' No')
    console.log('  Project ID:', projectIdNum || 'Not specified')
    console.log('  Description:', description || 'Not specified')

    let query = 'UPDATE testimonials SET author_name = $1, author_title = $2, quote = $3, image_url = $4, is_approved = $5'
    const params: any[] = [author_name, author_title, quote, image_url || null, is_approved || false]
    let paramCount = 6

    if (hasDescriptionColumn) {
      query += ', description = $' + paramCount
      params.push(description || null)
      paramCount++
    }

    if (hasProjectIdColumn) {
      query += ', project_id = $' + paramCount
      params.push(projectIdNum || null)
      paramCount++
    }

    query += ', updated_at = CURRENT_TIMESTAMP WHERE id = $' + paramCount + ' RETURNING *'
    params.push(id)

    const result = await pool.query(query, params)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }

    console.log(' Backend: Testimonial updated successfully')

    res.json({ message: 'Testimonial updated successfully', testimonial: result.rows[0] })
  } catch (error) {
    console.error(' Backend: Error updating testimonial:', error)
    res.status(500).json({ error: 'Failed to update testimonial' })
  }
})

// DELETE: Remove testimonial
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM testimonials WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }

    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    res.status(500).json({ error: 'Failed to delete testimonial' })
  }
})

export default router
