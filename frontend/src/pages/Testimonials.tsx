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
  const [clickedImageId, setClickedImageId] = useState<number | null>(null)

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

  const handleImageClick = (id: number) => {
    setClickedImageId(clickedImageId === id ? null : id)
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

        @keyframes imageZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.15);
          }
        }

        @keyframes imageBrighten {
          from {
            filter: brightness(1) contrast(1);
          }
          to {
            filter: brightness(1.2) contrast(1.1);
          }
        }

        @keyframes imageGlow {
          from {
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.1);
          }
          to {
            box-shadow: 0 0 30px 10px rgba(37, 99, 235, 0.5);
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
        .testimonial-card:nth-child(4) { animation-delay: 0.4s; }
        .testimonial-card:nth-child(5) { animation-delay: 0.5s; }
        .testimonial-card:nth-child(6) { animation-delay: 0.6s; }

        .testimonial-image {
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.1);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .testimonial-image:hover {
          animation: imageZoom 0.5s ease-out forwards, imageBrighten 0.5s ease-out forwards, imageGlow 0.5s ease-out forwards;
        }

        .testimonial-image.clicked {
          animation: imageZoom 0.5s ease-out forwards, imageBrighten 0.5s ease-out forwards, imageGlow 0.5s ease-out forwards;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .testimonial-image:hover img,
        .testimonial-image.clicked img {
          filter: brightness(1.2) contrast(1.1) saturate(1.2);
        }
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
              <div key={testimonial.id} className="testimonial-card card p-6 border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.image_url && (
                    <div 
                      className={`testimonial-image w-16 h-16 ${clickedImageId === testimonial.id ? 'clicked' : ''}`}
                      onClick={() => handleImageClick(testimonial.id)}
                    >
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.author_name}
                        onError={(e) => {
                          console.error('❌ Failed to load image:', testimonial.image_url)
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="testimonial-content flex-1">
                    <h3 className="font-bold text-primary testimonial-author">{testimonial.author_name}</h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted testimonial-title">
                      {testimonial.author_title}
                    </p>
                  </div>
                </div>
                <p className="text-light-text dark:text-dark-text italic testimonial-quote">
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
