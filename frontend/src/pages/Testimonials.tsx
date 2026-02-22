import { useState, useEffect } from 'react'
import { Testimonial } from '../types/index'

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const testimonials: Testimonial[] = [
    {
      quote: 'The new platform exceeded our expectations. Not only is it faster and more user-friendly, but the sales increase has been remarkable. Highly recommend!',
      author: 'Abebe K.',
      title: 'CEO',
      company: 'TechEthio',
      logo: '/src/assets/ecommerce.jpg'
    },
    {
      quote: 'This app transformed how our team works together. We\'re more organized, more productive, and actually enjoy using it. Worth every penny!',
      author: 'Sarah M.',
      title: 'Project Manager',
      company: 'StartupHub',
      logo: '/src/assets/app.jpg'
    },
    {
      quote: 'The dashboard gives us the insights we need in real-time. It\'s beautiful, fast, and incredibly useful for our business decisions.',
      author: 'John D.',
      title: 'Data Director',
      company: 'Analytics Pro',
      logo: '/src/assets/dashboard.jpg'
    },
    {
      quote: 'The platform launched on time and has been rock solid. Our users love the real-time messaging feature. Exceptional work!',
      author: 'Michael T.',
      title: 'Founder',
      company: 'SocialConnect',
      logo: '/src/assets/media.jpg'
    },
    {
      quote: 'Beautiful design, accurate data, and lightning-fast performance. Our users request this feature more than anything else!',
      author: 'Lisa R.',
      title: 'Product Manager',
      company: 'TravelHub',
      logo: '/src/assets/weather2.jpg'
    },
    {
      quote: 'This platform transformed my blogging workflow. The SEO features are incredible and my traffic has tripled!',
      author: 'David K.',
      title: 'Content Creator',
      company: 'TechBlog Pro',
      logo: '/src/assets/blog.jpg'
    }
  ]

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px);
          }
        }

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .section-animate:nth-of-type(1) { animation-delay: 0s; }
        .section-animate:nth-of-type(2) { animation-delay: 0.2s; }

        .carousel-container {
          position: relative;
          overflow: hidden;
        }

        .testimonial-slide {
          animation: slideIn 0.6s ease-out forwards;
        }

        .testimonial-slide.exit {
          animation: slideOut 0.6s ease-out forwards;
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .dark .testimonial-card {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          color: #fbbf24;
        }

        .quote-mark {
          font-size: 3rem;
          color: rgba(37, 99, 235, 0.2);
          line-height: 1;
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(37, 99, 235, 0.8);
          hover: rgba(37, 99, 235, 1);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-button:hover {
          background: rgba(37, 99, 235, 1);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-button.prev {
          left: 20px;
        }

        .carousel-button.next {
          right: 20px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .dot.active {
          background: rgba(37, 99, 235, 1);
          transform: scale(1.3);
        }

        .dot:hover {
          background: rgba(37, 99, 235, 0.6);
        }

        .slide-counter {
          text-align: center;
          margin-top: 1rem;
          color: rgba(37, 99, 235, 0.7);
          font-size: 0.875rem;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="section-animate text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Client Testimonials</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            What my clients say about working with me. Real feedback from real projects.
          </p>
        </div>

        {/* Carousel */}
        <div className="section-animate carousel-container mb-8">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="testimonial-slide testimonial-card bg-light-surface dark:bg-dark-surface rounded-xl p-12 border border-light-border dark:border-dark-border">
              {/* Stars */}
              <div className="stars mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="star w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <div className="quote-mark">"</div>
              <p className="text-light-text dark:text-dark-text leading-relaxed text-lg mb-8 -mt-4">
                {testimonials[currentIndex].quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-8 border-t border-light-border dark:border-dark-border">
                {testimonials[currentIndex].logo && (
                  <img
                    src={testimonials[currentIndex].logo}
                    alt={testimonials[currentIndex].company}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text text-lg">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-light-muted dark:text-dark-muted">
                    {testimonials[currentIndex].title}
                  </p>
                  <p className="text-sm text-primary dark:text-accent font-medium">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="carousel-button prev"
              title="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="carousel-button next"
              title="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                title={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="slide-counter">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>

        {/* CTA Section */}
        <div className="section-animate mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-12 border border-primary/20 dark:border-accent/20">
            <h2 className="text-3xl font-bold mb-4 text-light-text dark:text-dark-text">
              Ready to work together?
            </h2>
            <p className="text-light-muted dark:text-dark-muted mb-8 max-w-2xl mx-auto">
              Let's discuss your project and how I can help bring your vision to life.
            </p>
            <a href="/contact" className="btn-primary inline-block">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
