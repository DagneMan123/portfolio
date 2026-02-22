import { useState, useEffect } from 'react'

export default function About() {
  const [scrollY, setScrollY] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scrollRotateZ, setScrollRotateZ] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setScrollRotateZ((window.scrollY * 0.5) % 360)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotX = ((y - centerY) / centerY) * 12
    const rotY = ((centerX - x) / centerX) * 12
    
    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(37, 99, 235, 0.6);
          }
        }

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .section-animate:nth-of-type(1) { animation-delay: 0s; }
        .section-animate:nth-of-type(2) { animation-delay: 0.2s; }
        .section-animate:nth-of-type(3) { animation-delay: 0.4s; }
        .section-animate:nth-of-type(4) { animation-delay: 0.6s; }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .section-hover {
          transition: all 0.3s ease;
        }

        .section-hover:hover {
          transform: translateY(-2px);
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-animate {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .stagger-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }
        .stagger-item:nth-child(5) { animation-delay: 0.5s; }
        .stagger-item:nth-child(6) { animation-delay: 0.6s; }

        .interactive-element {
          position: relative;
          overflow: hidden;
        }

        .interactive-element::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .interactive-element:hover::before {
          left: 100%;
        }

        * {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }

        .no-transition {
          transition: none;
        }

        .about-image-container {
          position: relative;
          transition: all 0.3s ease;
          perspective: 1200px;
        }

        .about-image-container:hover {
          animation: imageBorder 2s ease-in-out infinite;
        }

        .about-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .about-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1));
          z-index: 10;
          pointer-events: none;
          transform-style: preserve-3d;
        }

        .about-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: opacity 0.3s ease;
          transform-style: preserve-3d;
        }

        .about-image-container:hover .about-image-wrapper img {
          opacity: 1;
          filter: brightness(1.1) contrast(1.05);
          transform: scale(1.05) translateZ(20px);
        }

        @keyframes parallaxFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .parallax-image {
          animation: parallaxFloat 4s ease-in-out infinite;
        }

        .highlight-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .highlight-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s ease;
        }

        .highlight-card:hover::before {
          left: 100%;
        }

        .highlight-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
        }

        .dark .highlight-card:hover {
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
        }

        .education-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .education-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: right 0.6s ease;
        }

        .education-card:hover::after {
          right: 100%;
        }

        .education-card:hover {
          transform: translateX(8px);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .stat-number {
          transition: all 0.3s ease;
        }

        .highlight-card:hover .stat-number {
          transform: scale(1.1);
          color: #2563eb;
        }

        .dark .highlight-card:hover .stat-number {
          color: #0ea5e9;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="section-animate grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative about-image-container group" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-3xl opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-2xl border border-primary/30 dark:border-accent/30 h-96 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-primary/50 transition-all duration-300 parallax-image" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
              <div 
                className="about-image-wrapper absolute inset-0"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${scrollRotateZ}deg)`,
                }}
              >
                <img 
                  src="/src/assets/dagne.jpg" 
                  alt="About Me" 
                  className="group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-4 gradient-text">About Me</h1>
              <p className="text-light-muted dark:text-dark-muted text-lg leading-relaxed">
                I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. 
                My journey in tech started with a curiosity about how things work, which evolved into a career dedicated 
                to creating elegant solutions to complex problems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-primary dark:text-accent">My Approach</h2>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">
                I believe in writing clean, maintainable code that not only solves today's problems but is also 
                flexible enough to adapt to tomorrow's requirements. I'm passionate about performance optimization, 
                user experience, and staying updated with the latest technologies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-primary dark:text-accent">Beyond Code</h2>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">
                When I'm not coding, you'll find me contributing to open-source projects, writing technical blog posts, 
                mentoring junior developers, or exploring emerging technologies. I'm also an advocate for clean code practices 
                and continuous learning.
              </p>
            </div>
          </div>
        </div>

        <div className="section-animate card p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="highlight-card text-center card p-6">
              <div className="stat-number text-4xl font-bold text-primary dark:text-accent mb-2">50+</div>
              <p className="text-light-muted dark:text-dark-muted">Projects Completed</p>
            </div>
            <div className="highlight-card text-center card p-6">
              <div className="stat-number text-4xl font-bold text-primary dark:text-accent mb-2">30+</div>
              <p className="text-light-muted dark:text-dark-muted">Happy Clients</p>
            </div>
            <div className="highlight-card text-center card p-6">
              <div className="stat-number text-4xl font-bold text-primary dark:text-accent mb-2">5+</div>
              <p className="text-light-muted dark:text-dark-muted">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="section-animate">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Education & Certifications</h2>
          <div className="space-y-6">
            <div className="education-card card-hover p-6 border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Bachelor of Science in Computer Science</h3>
              <p className="text-light-muted dark:text-dark-muted mb-2">University of Technology, 2019</p>
              <p className="text-light-muted dark:text-dark-muted text-sm">GPA: 3.8/4.0 - Graduated with Honors</p>
            </div>

            <div className="education-card card-hover p-6 border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">AWS Certified Solutions Architect</h3>
              <p className="text-light-muted dark:text-dark-muted mb-2">Amazon Web Services, 2022</p>
              <p className="text-light-muted dark:text-dark-muted text-sm">Professional Level Certification</p>
            </div>

            <div className="education-card card-hover p-6 border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Full-Stack Web Development Bootcamp</h3>
              <p className="text-light-muted dark:text-dark-muted mb-2">Tech Academy, 2018</p>
              <p className="text-light-muted dark:text-dark-muted text-sm">Intensive 12-week program covering modern web technologies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
