import { useEffect, useState } from 'react'
import { Project } from '../types/index'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

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
      testimonial: {
        quote: 'The dashboard gives us the insights we need in real-time. It\'s beautiful, fast, and incredibly useful for our business decisions.',
        author: 'John D.',
        title: 'Data Director',
        company: 'Analytics Pro',
        logo: '/src/assets/dashboard.jpg'
      }
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
      testimonial: {
        quote: 'The platform launched on time and has been rock solid. Our users love the real-time messaging feature. Exceptional work!',
        author: 'Michael T.',
        title: 'Founder',
        company: 'SocialConnect',
        logo: '/src/assets/media.jpg'
      }
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
      testimonial: {
        quote: 'Beautiful design, accurate data, and lightning-fast performance. Our users request this feature more than anything else!',
        author: 'Lisa R.',
        title: 'Product Manager',
        company: 'TravelHub',
        logo: '/src/assets/weather2.jpg'
      }
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
      testimonial: {
        quote: 'This platform transformed my blogging workflow. The SEO features are incredible and my traffic has tripled!',
        author: 'David K.',
        title: 'Content Creator',
        company: 'TechBlog Pro',
        logo: '/src/assets/blog.jpg'
      }
    }
  ]

  const filteredProjects = filter === 'featured' 
    ? allProjects.filter(p => p.featured)
    : allProjects

  const technologies = ['all', 'React', 'Node.js', 'TypeScript', 'PostgreSQL']

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

        .project-image-container {
          position: relative;
          overflow: hidden;
          height: 240px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
        }

        .project-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-image-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .stagger-item:hover .project-image-container img {
          transform: scale(1.1) rotate(1deg);
          filter: brightness(1.15);
        }

        .stagger-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        .dark .stagger-item:hover {
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="section-animate text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">My Projects</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills and expertise
          </p>
        </div>

        <div className="section-animate flex flex-wrap gap-3 justify-center mb-12">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === tech
                  ? 'bg-primary text-white'
                  : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-primary'
              }`}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-light-muted dark:text-dark-muted text-lg">Loading projects...</p>
          </div>
        )}

        <div className="section-animate grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
