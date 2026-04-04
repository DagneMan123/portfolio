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
  editToken?: string
}

export default function TestimonialForm({ onSuccess, initialData, isEditing, onUpdate, projectId, editToken }: TestimonialFormProps) {
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
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'project_id' ? parseInt(value) : value 
    }))
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
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Use absolute path to ensure it hits your local server correctly
      const baseUrl = 'http://localhost:5000'
      let endpoint = ''
      let method = ''

      if (isEditing && editToken) {
        // Use token-based endpoint for editing
        endpoint = `${baseUrl}/api/testimonials/edit/${editToken}`
        method = 'PUT'
      } else if (isEditing && initialData?.id) {
        // Fallback to ID-based endpoint
        endpoint = `${baseUrl}/api/testimonials/${initialData.id}`
        method = 'PUT'
      } else {
        // New testimonial
        endpoint = `${baseUrl}/api/testimonials`
        method = 'POST'
      }

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          is_approved: true
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit testimonial')
      }

      const data = await response.json()

      // CRITICAL: Call parent functions
      if (isEditing && onUpdate) {
        onUpdate()
      } else if (onSuccess) {
        // Ensure we pass the edit link to the parent to trigger the Success screen
        const link = data.edit_link || `/edit/${data.testimonial?.edit_token}`
        onSuccess(link)
      }

    } catch (err: any) {
      setError(err.message || 'Connection error. Is the server running?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
            Full Name
          </label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl focus:border-primary focus:outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
            Job Title / Company
          </label>
          <input
            type="text"
            name="author_title"
            value={formData.author_title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl focus:border-primary focus:outline-none transition-all"
            placeholder="CEO at TechCorp"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
          Target Project {projectId ? '(Locked)' : '(Optional)'}
        </label>
        <select
          name="project_id"
          value={formData.project_id}
          onChange={handleChange}
          disabled={!!projectId}
          className="w-full px-4 py-3 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl focus:border-primary focus:outline-none disabled:opacity-50"
        >
          <option value={0}>General Feedback (No Project)</option>
          <option value={1}>E-Commerce Platform</option>
          <option value={2}>Task Management App</option>
          <option value={3}>Analytics Dashboard</option>
          <option value={4}>Social Media App</option>
          <option value={5}>Weather Application</option>
          <option value={6}>Blog Platform</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
          Short Context / Role
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl focus:border-primary focus:outline-none transition-all"
          placeholder="e.g. Worked together on the frontend migration"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
          Testimonial / Quote
        </label>
        <textarea
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          className="w-full h-32 px-4 py-4 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl focus:border-primary focus:outline-none resize-none"
          placeholder="What was your experience working with me?"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="w-full px-4 py-2 bg-light-surface dark:bg-dark-bg border border-primary/10 rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary/10 file:text-primary"
            />
          </div>
          {formData.image_url && (
            <img src={formData.image_url} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
          )}
        </div>
        {uploadingImage && <p className="text-xs text-primary mt-2 animate-pulse">Uploading to Cloudinary...</p>}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full btn-primary py-4 rounded-xl font-bold uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-primary/20"
      >
        {loading ? 'Processing...' : isEditing ? 'Update Feedback' : 'Submit Feedback'}
      </button>
    </form>
  )
}