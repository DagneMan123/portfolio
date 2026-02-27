import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import pool from '../config/database.js'
import crypto from 'crypto'

const router = Router()

// Generate unique edit token
function generateEditToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// GET: Fetch approved testimonials (public) - MUST be before /:id route
router.get('/public', async (_req: Request, res: Response) => {
  try {
    console.log('📥 Backend: Fetching approved testimonials...')
    const result = await pool.query(
      'SELECT id, author_name, author_title, quote, image_url, created_at FROM testimonials WHERE is_approved = true ORDER BY created_at DESC'
    )
    console.log('✅ Backend: Found', result.rows.length, 'approved testimonials')
    res.json(result.rows)
  } catch (error) {
    console.error('❌ Backend: Error fetching testimonials:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// GET: Fetch all testimonials (admin) - MUST be before /:id route
router.get('/admin/all', async (_req: Request, res: Response) => {
  try {
    console.log('📥 Backend: Fetching all testimonials (admin)...')
    const result = await pool.query(
      'SELECT * FROM testimonials ORDER BY created_at DESC'
    )
    console.log('✅ Backend: Found', result.rows.length, 'total testimonials')
    res.json(result.rows)
  } catch (error) {
    console.error('❌ Backend: Error fetching testimonials:', error)
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

    const { author_name, author_title, quote, image_url } = req.body
    const edit_token = generateEditToken()

    console.log('📝 Backend: Submitting new testimonial...')
    console.log('  Author:', author_name)
    console.log('  Title:', author_title)
    console.log('  Image URL:', image_url ? '✅ Provided' : '❌ Not provided')

    const result = await pool.query(
      'INSERT INTO testimonials (author_name, author_title, quote, image_url, edit_token, is_approved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [author_name, author_title, quote, image_url || null, edit_token, true]
    )

    console.log('✅ Backend: Testimonial saved with ID:', result.rows[0].id)
    console.log('✅ Backend: Testimonial auto-approved and will appear immediately')

    res.status(201).json({
      message: 'Testimonial submitted successfully and approved!',
      edit_link: `/edit/${edit_token}`,
      testimonial: result.rows[0]
    })
  } catch (error) {
    console.error('❌ Backend: Error submitting testimonial:', error)
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
    const { author_name, author_title, quote, image_url, is_approved } = req.body

    console.log('✏️ Backend: Updating testimonial ID:', id)
    console.log('  Approved:', is_approved ? '✅ Yes' : '❌ No')

    const result = await pool.query(
      'UPDATE testimonials SET author_name = $1, author_title = $2, quote = $3, image_url = $4, is_approved = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [author_name, author_title, quote, image_url || null, is_approved || false, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }

    console.log('✅ Backend: Testimonial updated successfully')

    res.json({ message: 'Testimonial updated successfully', testimonial: result.rows[0] })
  } catch (error) {
    console.error('❌ Backend: Error updating testimonial:', error)
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
