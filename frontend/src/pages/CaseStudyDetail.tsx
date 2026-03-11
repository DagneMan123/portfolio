import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Project } from '../types/index'

interface Testimonial {
  id: number
  author_name: string
  author_title: string
  quote: string
  image_url?: string
  edit_token?: string
  project_id?: number
  description?: string
}

export default function CaseStudyDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)

  // Fetch testimonials from database filtered by project
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/testimonials/public?projectId=${projectId}`)
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        } else {
          console.error('Failed to load testimonials (Status: ' + response.status + ')')
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoadingTestimonials(false)
      }
    }

    if (projectId) {
      fetchTestimonials()
    }
  }, [projectId])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotX = ((y - centerY) / centerY) * 15
    const rotY = ((centerX - x) / centerX) * 15
    
    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // All projects data
  const allProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management, payment processing with Stripe, and comprehensive admin dashboard.',
      technologies: ['React', 'Node.js', 'mongoDB', ' CSS'],
      link: 'https://ecommerce2018.netlify.app',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/ecommerce.jpg',
      caseStudy: {
        problem: 'The client had an outdated e-commerce platform that was slow, difficult to navigate, and didn\'t work well on mobile devices. They were losing customers due to poor user experience and checkout abandonment was at 45%.',
        solution: 'I redesigned the entire platform using React for the frontend and Node.js for the backend. Implemented Stripe for secure payment processing, optimized images and lazy loading for performance, and created a responsive design that works seamlessly on all devices. Added real-time inventory management and a comprehensive admin dashboard for easy product management.',
        result: 'The new platform loads in under 2 seconds (previously 8+ seconds), mobile traffic increased by 65%, and checkout abandonment dropped to 12%. Revenue increased by 40% within the first quarter.'
      },

    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, team collaboration features, advanced filtering, and progress tracking.',
      technologies: ['React',  'TypeScript', 'postgres', 'Tailwind CSS'],
      link: 'https://taskapp-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/app.jpg',
      caseStudy: {
        problem: 'A growing startup was struggling with team coordination. They were using multiple tools for task management, communication, and progress tracking, leading to confusion and missed deadlines.',
        solution: 'Built a unified task management application with real-time collaboration features. Implemented TypeScript for type safety, PostgreSQL for reliable data storage, and integrated real-time updates using WebSockets. Added advanced filtering, team collaboration features, and progress tracking dashboards.',
        result: 'Team productivity increased by 35%, project delivery time reduced by 25%, and team satisfaction scores improved significantly. The app now manages over 5,000 tasks monthly.'
      },

    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive data visualization, custom reports generation, and performance metrics tracking.',
      technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'Express'],
      link: 'https://analytics-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/dashboard.jpg',
      caseStudy: {
        problem: 'A data-driven company needed better insights into their business metrics. Their existing analytics solution was slow, difficult to customize, and couldn\'t handle real-time data updates.',
        solution: 'Developed a modern analytics dashboard using Next.js for performance and Chart.js for beautiful visualizations. Built custom report generation features, implemented real-time data updates, and created an intuitive interface for non-technical users to explore data.',
        result: 'Dashboard loads 10x faster than the previous solution, users can now generate custom reports in seconds instead of hours, and data-driven decision making improved by 50%.'
      },

    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'Social networking platform with user authentication, real-time messaging, feed generation, and media sharing capabilities.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: 'https://social-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/media.jpg',
      caseStudy: {
        problem: 'A startup wanted to build a social platform but lacked the technical expertise. They needed a scalable solution that could handle real-time messaging and media uploads.',
        solution: 'Built a full-featured social media platform with React frontend and Node.js backend. Implemented Socket.io for real-time messaging, MongoDB for flexible data storage, and integrated media upload capabilities with cloud storage.',
        result: 'Platform successfully launched with 10,000+ users in the first month, real-time messaging works flawlessly, and the platform scales efficiently.'
      },

    },
    {
      id: 5,
      title: 'Weather Application',
      description: 'Weather forecasting app with real-time data, location-based services, and beautiful UI with weather animations.',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Tailwind CSS'],
      link: 'https://weather-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/weather2.jpg',
      caseStudy: {
        problem: 'A travel company needed a weather app for their platform but wanted something more beautiful and user-friendly than existing solutions.',
        solution: 'Created a stunning weather application with real-time data from OpenWeather API, location-based services using geolocation, and smooth animations. Built with React and TypeScript for reliability.',
        result: 'The app became a popular feature on their platform, with 50,000+ daily active users and excellent user ratings.'
      },

    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Full-featured blogging platform with markdown support, SEO optimization, comment system, and user authentication.',
      technologies: ['react', 'typescript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      link: 'https://blog-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/blog.jpg',
      caseStudy: {
        problem: 'A content creator needed a blogging platform that was easy to use, SEO-friendly, and allowed for community engagement through comments.',
        solution: 'Built a modern blogging platform with markdown support for easy content creation, implemented SEO optimization features, added a comment system for community engagement, and created user authentication for personalized experiences.',
        result: 'The platform now hosts 500+ blog posts, attracts 100,000+ monthly visitors, and has become a go-to resource in the industry.'
      },

    }
  ]

  const project = allProjects.find(p => p.id === parseInt(projectId || '0'))

  if (!project || !project.caseStudy) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/projects')}
            className="btn-primary"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .case-study-container {
          animation: fadeInUp 0.6s ease-out;
        }

        .case-study-section {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .case-study-icon {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .case-study-text {
          flex: 1;
        }

        .case-study-text h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .case-study-text p {
          font-size: 1rem;
          line-height: 1.6;
        }

        .project-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          perspective: 1200px;
        }

        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .project-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
          z-index: 10;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-image-wrapper:hover::before {
          opacity: 1;
        }

        .project-image-wrapper:hover img {
          filter: brightness(1.1) contrast(1.05);
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-primary dark:text-accent hover:opacity-80 transition-opacity mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <h1 className="text-5xl font-bold mb-4 gradient-text">{project.title}</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg">{project.description}</p>
        </div>

        {/* Project Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div 
            className="project-image-wrapper"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Case Study Content */}
        <div className="case-study-container space-y-12">
          {/* Problem */}
          <div className="case-study-section">
            <div className="case-study-icon bg-red-100 dark:bg-red-900">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="case-study-text">
              <h3 className="text-light-text dark:text-dark-text">The Problem</h3>
              <p className="text-light-muted dark:text-dark-muted">{project.caseStudy.problem}</p>
            </div>
          </div>

          {/* Solution */}
          <div className="case-study-section">
            <div className="case-study-icon bg-blue-100 dark:bg-blue-900">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="case-study-text">
              <h3 className="text-light-text dark:text-dark-text">The Solution</h3>
              <p className="text-light-muted dark:text-dark-muted">{project.caseStudy.solution}</p>
            </div>
          </div>

          {/* Result */}
          <div className="case-study-section">
            <div className="case-study-icon bg-green-100 dark:bg-green-900">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="case-study-text">
              <h3 className="text-light-text dark:text-dark-text">The Result</h3>
              <p className="text-light-muted dark:text-dark-muted">{project.caseStudy.result}</p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">Client Testimonials</h3>
            
            {loadingTestimonials ? (
              <div className="text-center py-8">
                <p className="text-light-muted dark:text-dark-muted">Loading testimonials...</p>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-8 border border-primary/20 dark:border-accent/20">
                    <div className="flex items-start gap-4 mb-6">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.author_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                    </div>
                    {testimonial.description && (
                      <p className="text-light-muted dark:text-dark-muted text-sm mb-4 italic">
                        "{testimonial.description}"
                      </p>
                    )}
                    <p className="text-light-text dark:text-dark-text italic text-lg mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-light-text dark:text-dark-text text-lg">
                          {testimonial.author_name}
                        </p>
                        <p className="text-light-muted dark:text-dark-muted">
                          {testimonial.author_title}
                        </p>
                      </div>
                    </div>
                    {testimonial.edit_token && (
                      <div className="mt-6 pt-6 border-t border-primary/20 dark:border-accent/20">
                        <button
                          onClick={() => navigate(`/edit/${testimonial.edit_token}`)}
                          className="text-sm text-primary dark:text-accent hover:underline font-semibold inline-flex items-center gap-2"
                        >
                          ✏️ Edit Testimonial
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-8 border border-primary/20 dark:border-accent/20 text-center">
                <p className="text-light-muted dark:text-dark-muted mb-4">No testimonials yet for this project. Be the first to share your experience!</p>
                <button
                  onClick={() => navigate(`/submit-testimonial?projectId=${projectId}`)}
                  className="text-primary dark:text-accent hover:underline font-semibold inline-flex items-center gap-2"
                >
                  ✏️ Share Your Testimonial
                </button>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-primary/20 dark:border-accent/20">
              <button
                onClick={() => navigate(`/submit-testimonial?projectId=${projectId}`)}
                className="text-primary dark:text-accent hover:underline font-semibold inline-flex items-center gap-2"
              >
                ✏️ Share Your Testimonial
              </button>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-12 pt-12 border-t border-light-border dark:border-dark-border">
          <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex gap-4">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
