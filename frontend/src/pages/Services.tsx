import { useState } from 'react'

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      title: 'Creative Frontend Development',
      description: 'Crafting visually stunning, high-performance, and responsive websites using modern frameworks.',
      keywords: ['React', 'Next.js', 'Animations (GSAP/Framer Motion)', 'Responsive Design'],
      icon: '🎨',
      fullContent: 'I specialize in creating beautiful, responsive, and high-performance frontend solutions. Using modern frameworks like React and Next.js, I build interactive user interfaces with smooth animations and seamless user experiences. Every project is optimized for performance and accessibility.'
    },
    {
      id: 2,
      title: 'Full-Stack Web Applications',
      description: 'Building robust, scalable server-side solutions and database architectures that power complex business logic.',
      keywords: ['Node.js', 'Express', 'MongoDB/Firebase', 'RESTful APIs'],
      icon: '⚙️',
      fullContent: 'I develop complete web applications from frontend to backend. With expertise in Node.js and Express, I build scalable server architectures. I design robust database solutions using MongoDB and Firebase, creating RESTful APIs that power complex business logic and ensure data integrity.'
    },
    {
      id: 3,
      title: 'UI/UX & Interactive Design',
      description: 'Designing intuitive user interfaces and seamless experiences with a focus on user psychology and brand identity.',
      keywords: ['Figma', 'Prototyping', 'Wireframing', 'User Research'],
      icon: '✨',
      fullContent: 'I create intuitive and beautiful user interfaces with a deep focus on user experience. Using Figma for design and prototyping, I conduct user research and create wireframes that guide development. Every design decision is backed by user psychology and brand identity principles.'
    },
    {
      id: 4,
      title: 'Performance & SEO Optimization',
      description: 'Enhancing website load speeds and visibility on search engines to drive organic traffic and user retention.',
      keywords: ['Lighthouse Audit', 'Core Web Vitals', 'SEO Strategy'],
      icon: '🚀',
      fullContent: 'I optimize websites for speed and search engine visibility. Using Lighthouse audits and Core Web Vitals analysis, I identify and fix performance bottlenecks. I implement comprehensive SEO strategies to improve organic traffic and ensure your website ranks well on search engines.'
    }
  ]

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg overflow-hidden">
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .section-animate:nth-of-type(1) { animation-delay: 0s; }
        .section-animate:nth-of-type(2) { animation-delay: 0.2s; }

        .service-card {
          background: transparent;
          border: none;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-shadow: none;
          min-height: auto;
          width: 100%;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.6s ease;
          display: none;
        }

        .service-card:hover::before {
          left: 100%;
        }

        .service-card:hover {
          transform: none;
          box-shadow: none;
          border-color: transparent;
          background: transparent;
        }

        .service-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .service-toggle {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          color: #2563eb;
        }

        .service-toggle.expanded {
          transform: rotate(180deg);
        }

        .service-icon {
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          margin-bottom: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .service-icon:hover {
          transform: scale(1.15);
          border-color: rgba(59, 130, 246, 0.6);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
        }

        .service-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          text-align: center;
        }

        .service-card:hover .service-title {
          color: #2563eb;
        }

        .service-description {
          color: rgba(37, 99, 235, 0.8);
          margin-bottom: 1.2rem;
          line-height: 1.6;
          font-size: 0.9rem;
          text-align: center;
        }

        .service-full-content {
          color: rgba(37, 99, 235, 0.7);
          line-height: 1.8;
          font-size: 0.9rem;
          padding: 2.5rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 1.2rem;
          animation: slideDown 0.15s ease-out;
          width: 420px;
          margin-top: 2rem;
          z-index: 10;
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.2);
          display: block;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          max-height: 600px;
          overflow-y: auto;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .keyword-badge {
          background: rgba(59, 130, 246, 0.1);
          color: rgba(37, 99, 235, 0.8);
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }

        .keyword-badge:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .service-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          justify-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        .stagger-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="section-animate text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 gradient-text">Services</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to transform your digital vision into reality
          </p>
        </div>

        {/* Services Grid */}
        <div className="section-animate">
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card stagger-item"
              >
                <div 
                  className="service-icon cursor-pointer"
                  onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                >
                  {service.icon}
                </div>
                {expandedService === service.id && (
                  <div className="service-full-content">
                    <h3 className="service-title mb-3">{service.title}</h3>
                    <p className="service-description mb-3">{service.description}</p>
                    <p className="text-light-muted dark:text-dark-muted mb-3 text-sm leading-relaxed">
                      {service.fullContent}
                    </p>
                    <div className="service-keywords">
                      {service.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-badge">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
      </div>
    </div>
  )
}
