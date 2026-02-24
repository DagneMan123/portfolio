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

  const getVisibleImages = () => {
    const images = []
    for (let i = 0; i < 3; i++) {
      images.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return images
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

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .image-carousel-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          width: 100%;
          max-width: 900px;
        }

        .carousel-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 1rem;
          padding: 2.5rem 1.5rem;
          text-align: center;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .carousel-image-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .carousel-image-card {
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          width: 130px;
          height: 130px;
          cursor: pointer;
          transition: all 0.4s ease;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .carousel-image-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .carousel-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .carousel-image-card:hover img {
          transform: scale(1.08);
        }

        .carousel-image-overlay {
          position: absolute;
          inset: 0;
          background: transparent;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
        }

        .carousel-description {
          font-size: 1rem;
          color: rgba(37, 99, 235, 0.9);
          font-weight: 700;
          margin-bottom: 0.75rem;
          min-height: 1.5rem;
        }

        .carousel-quote {
          font-size: 0.85rem;
          color: rgba(37, 99, 235, 0.7);
          font-style: italic;
          line-height: 1.5;
          margin-top: 0;
        }

        .carousel-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          color: rgba(37, 99, 235, 0.7);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 20;
          font-size: 2.5rem;
          font-weight: 300;
          line-height: 1;
        }

        .carousel-nav-button:hover {
          transform: translateY(-50%) scale(1.2);
        }

        .carousel-nav-button.prev {
          left: -70px;
        }

        .carousel-nav-button.next {
          right: -70px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .dot.active {
          background: #ff9500;
          transform: scale(1.2);
        }

        .dot:hover {
          background: #ffb84d;
        }

        .scroll-icon {
          text-align: center;
          margin-top: 3rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .scroll-icon svg {
          width: 32px;
          height: 32px;
          color: rgba(37, 99, 235, 0.6);
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .carousel-nav-button.prev {
            left: -50px;
          }

          .carousel-nav-button.next {
            right: -50px;
          }
        }

        @media (max-width: 768px) {
          .image-carousel-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .carousel-image-card {
            width: 120px;
            height: 120px;
          }

          .carousel-nav-button.prev {
            left: 5px;
          }

          .carousel-nav-button.next {
            right: 5px;
          }

          .carousel-nav-button {
            width: 40px;
            height: 40px;
          }
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

        {/* Image Carousel - 3 Images with Side Navigation */}
        <div className="section-animate mb-16">
          <div className="carousel-wrapper">
            <button
              onClick={prevSlide}
              className="carousel-nav-button prev"
              title="Previous"
            >
              ‹
            </button>

            <div className="image-carousel-container">
              {getVisibleImages().map((testimonial, index) => (
                <div key={index} className="carousel-image-wrapper">
                  <div className="carousel-image-card group">
                    <img 
                      src={testimonial.logo} 
                      alt={testimonial.company}
                    />
                    <div className="carousel-image-overlay"></div>
                  </div>
                  <div className="carousel-description">
                    {testimonial.author}
                  </div>
                  <div className="carousel-quote">
                    "{testimonial.quote}"
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="carousel-nav-button next"
              title="Next"
            >
              ›
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
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

        {/* Scroll Icon */}
        <div className="scroll-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
