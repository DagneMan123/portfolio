import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TestimonialForm from '../components/TestimonialForm'

export default function SubmitTestimonial() {
  const navigate = useNavigate()
  const [editLink, setEditLink] = useState('')

  const handleSuccess = (link: string) => {
    setEditLink(link)
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
          <h1 className="text-5xl font-bold mb-4 gradient-text">Share Your Feedback</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg">
            Help others by sharing your experience working with me
          </p>
        </div>

        {editLink ? (
          <div className="section-animate card p-8 text-center space-y-6">
            <div className="text-6xl">✓</div>
            <h2 className="text-2xl font-bold text-primary">Thank You!</h2>
            <p className="text-light-muted dark:text-dark-muted">
              Your testimonial has been submitted and is pending approval.
            </p>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              You can edit your testimonial anytime using this link:
            </p>
            <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg break-all">
              <code className="text-primary font-mono text-sm">
                {window.location.origin}{editLink}
              </code>
            </div>
            <p className="text-xs text-light-muted dark:text-dark-muted">
              Save this link to edit your testimonial later
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary py-3 rounded-lg font-bold uppercase tracking-widest"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="section-animate">
            <TestimonialForm onSuccess={handleSuccess} />
          </div>
        )}
      </div>
    </div>
  )
}
