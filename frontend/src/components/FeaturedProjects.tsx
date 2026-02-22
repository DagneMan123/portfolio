import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Project } from '../types/index'

const featuredProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    link: 'https://ecommerce-demo.com',
    github: 'https://github.com/DagneMan123/ecommerce',
    image: '/src/assets/ecommerce.jpg',
    featured: true,
    caseStudy: {
      problem: 'The client had an outdated e-commerce platform that was slow, difficult to navigate, and didn\'t work well on mobile devices. They were losing customers due to poor user experience and checkout abandonment was at 45%.',
      solution: 'I redesigned the entire platform using React for the frontend and Node.js for the backend. Implemented Stripe for secure payment processing, optimized images and lazy loading for performance, and created a responsive design that works seamlessly on all devices. Added real-time inventory management and a comprehensive admin dashboard for easy product management.',
      result: 'The new platform loads in under 2 seconds (previously 8+ seconds), mobile traffic increased by 65%, and checkout abandonment dropped to 12%. Revenue increased by 40% within the first quarter.'
    },
    testimonial: {
      quote: 'The new platform exceeded our expectations. Not only is it faster and more user-friendly, but the sales increase has been remarkable. Highly recommend!',
      author: 'Abebe K.',
      title: 'CEO',
      company: 'TechEthio',
      logo: '/src/assets/ecommerce.jpg'
    }
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team collaboration, and advanced filtering.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    link: 'https://taskapp-demo.com',
    github: 'https://github.com/DagneMan123/taskapp',
    image: '/src/assets/app.jpg',
    featured: true,
    caseStudy: {
      problem: 'A growing startup was struggling with team coordination. They were using multiple tools for task management, communication, and progress tracking, leading to confusion and missed deadlines.',
      solution: 'Built a unified task management application with real-time collaboration features. Implemented TypeScript for type safety, PostgreSQL for reliable data storage, and integrated real-time updates using WebSockets. Added advanced filtering, team collaboration features, and progress tracking dashboards.',
      result: 'Team productivity increased by 35%, project delivery time reduced by 25%, and team satisfaction scores improved significantly. The app now manages over 5,000 tasks monthly.'
    },
    testimonial: {
      quote: 'This app transformed how our team works together. We\'re more organized, more productive, and actually enjoy using it. Worth every penny!',
      author: 'Sarah M.',
      title: 'Project Manager',
      company: 'StartupHub',
      logo: '/src/assets/app.jpg'
    }
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization, custom reports, and performance metrics.',
    technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'Express'],
    link: 'https://analytics-demo.com',
    github: 'https://github.com/DagneMan123/analytics',
    image: '/src/assets/dashboard.jpg',
    featured: true,
    caseStudy: {
      problem: 'A data-driven company needed better insights into their business metrics. Their existing analytics solution was slow, difficult to customize, and couldn\'t handle real-time data updates.',
      solution: 'Developed a modern analytics dashboard using Next.js for performance and Chart.js for beautiful visualizations. Built custom report generation features, implemented real-time data updates, and created an intuitive interface for non-technical users to explore data.',
      result: 'Dashboard loads 10x faster than the previous solution, users can now generate custom reports in seconds instead of hours, and data-driven decision making improved by 50%.'
    },
    testimonial: {
      quote: 'The dashboard gives us the insights we need in real-time. It\'s beautiful, fast, and incredibly useful for our business decisions.',
      author: 'John D.',
      title: 'Data Director',
      company: 'Analytics Pro',
      logo: '/src/assets/dashboard.jpg'
    }
  }
]

export default function FeaturedProjects() {
  const [rotations, setRotations] = useState<{ [key: number]: { x: number; y: number } }>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotX = ((y - centerY) / centerY) * 15
    const rotY = ((centerX - x) / centerX) * 15
    
    setRotations(prev => ({
      ...prev,
      [projectId]: { x: rotX, y: rotY }
    }))
  }

  const handleMouseLeave = (projectId: number) => {
    setRotations(prev => ({
      ...prev,
      [projectId]: { x: 0, y: 0 }
    }))
  }

  const handleImageClick = (projectId: number) => {
    const project = featuredProjects.find(p => p.id === projectId)
    if (project?.caseStudy) {
      window.location.href = `/case-study/${projectId}`
    }
  }

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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .project-card {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .project-card:nth-child(1) { animation-delay: 0.1s; }
        .project-card:nth-child(2) { animation-delay: 0.2s; }
        .project-card:nth-child(3) { animation-delay: 0.3s; }

        .project-image {
          position: relative;
          overflow: hidden;
          height: 240px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          perspective: 1200px;
        }

        .project-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
          z-index: 10;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-image:hover::before {
          opacity: 1;
        }

        .project-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .project-image:hover img {
          filter: brightness(1.15);
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        .dark .project-card:hover {
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
        }

        .tech-badge {
          animation: scaleIn 0.4s ease-out forwards;
          opacity: 0;
        }

        .tech-badge:nth-child(1) { animation-delay: 0.2s; }
        .tech-badge:nth-child(2) { animation-delay: 0.25s; }
        .tech-badge:nth-child(3) { animation-delay: 0.3s; }
        .tech-badge:nth-child(4) { animation-delay: 0.35s; }
        .tech-badge:nth-child(5) { animation-delay: 0.4s; }

        .tech-badge:hover {
          transform: scale(1.05);
        }

        .project-title {
          transition: all 0.3s ease;
        }

        .project-card:hover .project-title {
          color: #2563eb;
        }

        .dark .project-card:hover .project-title {
          color: #0ea5e9;
        }

        .btn-group {
          display: flex;
          gap: 0.75rem;
        }

        .btn-group a {
          flex: 1;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-group a::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transition: left 0.4s ease;
        }

        .btn-group a:hover::before {
          left: 100%;
        }

        .case-study-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .case-study-overlay::-webkit-scrollbar {
          width: 4px;
        }

        .case-study-overlay::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .case-study-overlay::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .case-study-overlay::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .case-study-section {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .case-study-icon {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .case-study-text h4 {
          font-weight: 700;
          margin-bottom: 0.25rem;
          font-size: 0.85rem;
        }

        .case-study-text p {
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .close-button {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .case-study-button {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0);
          transition: background 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .case-study-button:hover {
          background: rgba(0, 0, 0, 0.4);
        }

        .case-study-button-content {
          text-align: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .case-study-button:hover .case-study-button-content {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            Showcasing my best work and technical expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-card group card-hover overflow-hidden">
              <div 
                className="project-image relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleImageClick(project.id)}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
              >
                <div 
                  className="project-image-wrapper"
                  style={{
                    transform: `rotateX(${rotations[project.id]?.x || 0}deg) rotateY(${rotations[project.id]?.y || 0}deg)`,
                  }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="project-title text-2xl font-bold mb-3 text-light-text dark:text-dark-text">{project.title}</h3>
                <p className="text-light-muted dark:text-dark-muted mb-4 leading-relaxed text-sm">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="btn-group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-center text-sm py-2 relative z-10">
                    Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-center text-sm py-2 relative z-10">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects" className="btn-primary inline-block group">
            <span className="flex items-center justify-center gap-2">
              View All Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
