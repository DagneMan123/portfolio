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
  }
  isEditing?: boolean
  onUpdate?: () => void
}

export default function TestimonialForm({ onSuccess, initialData, isEditing, onUpdate }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    author_name: initialData?.author_name || '',
    author_title: initialData?.author_title || '',
    quote: initialData?.quote || '',
    image_url: initialData?.image_url || '',
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

    try {
      const endpoint = isEditing ? `/api/testimonials/${initialData?.id}` : '/api/testimonials'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          Your Testimonial
        </label>
        <textarea
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg focus:border-primary focus:outline-none"
          placeholder="Share your feedback..."
        />
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
            <p className="text-sm text-green-500 mb-2">✅ Image uploaded successfully</p>
            <img src={formData.image_url} alt="Preview" className="w-24 h-24 rounded-lg object-cover border-2 border-green-500" />
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-500 text-sm font-semibold mb-2">❌ Error:</p>
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
