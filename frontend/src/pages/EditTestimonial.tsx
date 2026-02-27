import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TestimonialForm from '../components/TestimonialForm'

interface TestimonialData {
  id: number
  author_name: string
  author_title: string
  quote: string
  image_url?: string
}

export default function EditTestimonial() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [testimonial, setTestimonial] = useState<TestimonialData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/testimonials/edit/${token}`)
        if (!response.ok) {
          throw new Error('Testimonial not found')
        }
        const data = await response.json()
        setTestimonial(data)
      } catch (err) {
        setError('Could not load testimonial. The link may have expired.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchTestimonial()
    }
  }, [token])

  const handleUpdate = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <p className="text-light-muted dark:text-dark-muted">Loading...</p>
      </div>
    )
  }

  if (error || !testimonial) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-light-muted dark:text-dark-muted mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary py-3 rounded-lg font-bold uppercase tracking-widest"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-animate text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Edit Your Testimonial</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg">
            Update your feedback anytime
          </p>
        </div>

        <div className="section-animate">
          <TestimonialForm
            initialData={testimonial}
            isEditing={true}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  )
}
