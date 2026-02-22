import { Testimonial } from '../types/index'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-light-bg dark:bg-dark-bg">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-card {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }

        .testimonial-card {
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        .dark .testimonial-card:hover {
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
        }

        .quote-mark {
          font-size: 3rem;
          color: rgba(37, 99, 235, 0.2);
          line-height: 1;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          color: #fbbf24;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Client Testimonials</h2>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-light-surface dark:bg-dark-surface rounded-xl p-8 border border-light-border dark:border-dark-border"
            >
              {/* Stars */}
              <div className="stars mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="star w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <div className="quote-mark">"</div>
              <p className="text-light-text dark:text-dark-text leading-relaxed mb-6 -mt-4">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-light-border dark:border-dark-border">
                {testimonial.logo && (
                  <img
                    src={testimonial.logo}
                    alt={testimonial.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    {testimonial.title}
                  </p>
                  <p className="text-sm text-primary dark:text-accent font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
