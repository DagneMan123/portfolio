import { useState } from 'react'
import { uploadToCloudinary } from '../utils/cloudinary'

interface TestimonialFormProps {
  onSuccess?: (editLink: string) => void
  initialData?: {
    id?: number
    author_name: string
    author_title: string
    quote: string
    image_url?: string
    project_id?: number
    description?: string
  }
  isEditing?: boolean
  onUpdate?: () => void
  projectId?: number
}

export default function TestimonialForm({ onSuccess, initialData, isEditing, onUpdate, projectId }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    author_name: initialData?.author_name || '',
    author_title: initialData?.author_title || '',
    quote: initialData?.quote || '',
    image_url: initialData?.image_url || '',
    project_id: projectId || initialData?.project_id || 0,
    description: initialData?.description || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError('')

    try {
      const imageUrl = await uploadToCloudinary(file)
      setFormData(prev => ({ ...prev, image_url: imageUrl }))
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to upload image. Please try again.'
      setError(errorMessage)
      console.error('Image upload error:', err)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    // If project is selected, description is required
    if (formData.project_id > 0 && !formData.description.trim()) {
      setError('Please provide a project description')
      setLoading(false)
      return
    }

    try {
      const endpoint = isEditing ? `/api/testimonials/${initialData?.id}` : '/api/testimonials'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          is_approved: true
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit testimonial')
      }

      const data = await response.json()
      setSuccess(true)

      if (isEditing && onUpdate) {
        onUpdate()
      } else if (onSuccess && data.edit_link) {
        onSuccess(data.edit_link)
      }

      if (!isEditing) {
        setFormData({
          author_name: '',
          author_title: '',
          quote: '',
          image_url: '',
          project_id: projectId || 0,
          description: '',
        })
      }

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to submit testimonial. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 card p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
            Full Name
          </label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
            Job Title
          </label>
          <input
            type="text"
            name="author_title"
            value={formData.author_title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none"
            placeholder="e.g., CEO, Developer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
          Project {projectId ? '(Auto-selected)' : '(Optional)'}
        </label>
        <select
          name="project_id"
          value={formData.project_id}
          onChange={(e) => setFormData(prev => ({ ...prev, project_id: parseInt(e.target.value) || 0 }))}
          disabled={projectId ? true : false}
          className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none disabled:opacity-60"
        >
          {!projectId && <option value={0}>Select a project (optional)</option>}
          <option value={1}>E-Commerce Platform</option>
          <option value={2}>Task Management App</option>
          <option value={3}>Analytics Dashboard</option>
          <option value={4}>Social Media App</option>
          <option value={5}>Weather Application</option>
          <option value={6}>Blog Platform</option>
        </select>
        {formData.project_id > 0 && (
          <p className="text-xs text-primary mt-2">
            ✓ This testimonial will appear on the selected project's case study page
          </p>
        )}
      </div>

      {formData.project_id > 0 && (
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required={formData.project_id > 0}
            className="w-full h-24 px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none resize-none"
            placeholder="Describe what you worked on in this project..."
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          />
          <p className="text-xs text-light-muted dark:text-dark-muted mt-2">
            {formData.description.length} characters
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
          Your Testimonial
        </label>
        <textarea
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          className="w-full h-40 px-4 py-10 text-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none resize-none"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
          placeholder="Share your feedback..."
        />
        <p className="text-xs text-light-muted dark:text-dark-muted mt-2">
          {formData.quote.length} characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-widest mb-3 text-light-muted">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="flex-1 px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg cursor-pointer"
          />
          {uploadingImage && <span className="text-sm text-primary animate-pulse">📤 Uploading...</span>}
        </div>
        {formData.image_url && (
          <div className="mt-4">
            <p className="text-sm text-green-500 mb-2"> Image uploaded successfully</p>
            <img src={formData.image_url} alt="Preview" className="w-24 h-24 rounded-lg object-cover border-2 border-green-500" />
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-500 text-sm font-semibold mb-2"> Error:</p>
          <p className="text-red-500 text-sm">{error}</p>
          <details className="mt-3 text-xs text-red-400 cursor-pointer">
            <summary className="font-semibold">Troubleshooting Tips</summary>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Check that Cloudinary credentials are set in frontend/.env.local</li>
              <li>Verify upload preset exists and is set to "Unsigned" mode</li>
              <li>Try a smaller image file (under 5MB)</li>
              <li>Try JPG or PNG format</li>
              <li>Check browser console (F12) for more details</li>
            </ul>
          </details>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
          ✓ {isEditing ? 'Testimonial updated successfully!' : 'Testimonial submitted successfully! Check your email for the edit link.'}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full btn-primary py-3 rounded-lg font-bold uppercase tracking-widest disabled:opacity-50"
      >
        {loading ? 'Submitting...' : isEditing ? 'Update Testimonial' : 'Submit Testimonial'}
      </button>
    </form>
  )
}
