import { useEffect, useState } from 'react'

interface Testimonial {
  id: number
  author_name: string
  author_title: string
  quote: string
  image_url?: string
  is_approved: boolean
  created_at: string
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials/admin/all')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setTestimonials(data)
    } catch (err) {
      setError('Failed to load testimonials')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleApproval = async (id: number, currentStatus: boolean) => {
    try {
      const testimonial = testimonials.find(t => t.id === id)
      if (!testimonial) return

      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testimonial,
          is_approved: !currentStatus,
        }),
      })

      if (!response.ok) throw new Error('Failed to update')
      fetchTestimonials()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')
      fetchTestimonials()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <p className="text-light-muted dark:text-dark-muted">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Testimonials Admin</h1>
          <p className="text-light-muted dark:text-dark-muted">
            Manage and approve user testimonials
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {testimonials.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-light-muted dark:text-dark-muted">No testimonials yet</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6 border-l-4 border-primary">
                <div className="flex flex-col md:flex-row gap-6">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.author_name}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{testimonial.author_name}</h3>
                        <p className="text-sm text-light-muted dark:text-dark-muted">
                          {testimonial.author_title}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          testimonial.is_approved
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-yellow-500/20 text-yellow-600'
                        }`}
                      >
                        {testimonial.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>

                    <p className="text-light-text dark:text-dark-text mb-4 italic">
                      "{testimonial.quote}"
                    </p>

                    <p className="text-xs text-light-muted dark:text-dark-muted mb-4">
                      Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleApproval(testimonial.id, testimonial.is_approved)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                          testimonial.is_approved
                            ? 'bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30'
                            : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                        }`}
                      >
                        {testimonial.is_approved ? 'Unapprove' : 'Approve'}
                      </button>

                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="px-4 py-2 rounded-lg font-bold text-sm bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
