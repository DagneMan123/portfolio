import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Testimonial {
  id: number
  author_name: string
  author_title: string
  quote: string
  image_url?: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      console.log('📥 Fetching testimonials from /api/testimonials/public...')
      const response = await fetch('/api/testimonials/public')
      console.log('📨 Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Testimonials fetched successfully:', data.length, 'testimonials')
        setTestimonials(data)
        setError('')
      } else {
        const errorText = await response.text()
        console.error('❌ Failed to fetch testimonials:', response.status, errorText)
        setError(`Failed to load testimonials (Status: ${response.status})`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error('❌ Error fetching testimonials:', errorMessage)
      setError(`Error loading testimonials: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
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

        .testimonial-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="section-animate text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Client Testimonials</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto mb-8">
            What my clients say about working with me
          </p>
          <Link
            to="/submit-testimonial"
            className="btn-primary inline-block"
          >
            Share Your Feedback
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-light-muted dark:text-dark-muted">📥 Loading testimonials...</p>
          </div>
        ) : error ? (
          <div className="card p-12 text-center">
            <p className="text-red-500 mb-6">❌ {error}</p>
            <button
              onClick={fetchTestimonials}
              className="btn-primary inline-block"
            >
              Try Again
            </button>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-light-muted dark:text-dark-muted mb-6">
              No testimonials yet. Be the first to share your feedback!
            </p>
            <Link
              to="/submit-testimonial"
              className="btn-primary inline-block"
            >
              Submit Testimonial
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card card p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.author_name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        console.error('❌ Failed to load image:', testimonial.image_url)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-primary">{testimonial.author_name}</h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted">
                      {testimonial.author_title}
                    </p>
                  </div>
                </div>
                <p className="text-light-text dark:text-dark-text italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
