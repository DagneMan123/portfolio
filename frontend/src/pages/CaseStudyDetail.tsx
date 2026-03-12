import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Project } from '../types/index';

interface Testimonial {
  id: number;
  author_name: string;
  author_title: string;
  quote: string;
  image_url?: string;
  edit_token?: string;
  project_id?: number;
  description?: string;
}

export default function CaseStudyDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // 1. All Projects Data (Ensure IDs match your database project_ids)
  const allProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory and Stripe payments.',
      technologies: ['React', 'Node.js', 'mongoDB', 'Tailwind'],
      link: 'https://ecommerce2018.netlify.app',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/ecommerce.jpg',
      caseStudy: {
        problem: 'Client had an outdated platform losing mobile customers and high checkout abandonment.',
        solution: 'Redesigned using React/Node.js with a focus on speed and mobile-first responsive design.',
        result: 'Mobile traffic increased by 65%, and abandonment rates dropped from 45% to 12%.'
      },
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time team synchronization.',
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      link: 'https://taskapp-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/app.jpg',
      caseStudy: {
        problem: 'Startups struggling with team coordination across multiple disconnected communication tools.',
        solution: 'Built a unified workspace with real-time WebSocket updates for instant task synchronization.',
        result: 'Pilot teams reported a 35% increase in productivity and 25% faster project delivery.'
      },
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with high-performance interactive visualizations.',
      technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'Express'],
      link: 'https://analytics-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: true,
      image: '/src/assets/dashboard.jpg',
      caseStudy: {
        problem: 'Data-driven teams were frustrated by slow, non-interactive legacy reporting tools.',
        solution: 'Implemented Chart.js with Next.js Server-Side Rendering (SSR) for real-time data streaming.',
        result: 'Dashboard load times improved by 10x, allowing users to generate custom reports in seconds.'
      },
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'Social networking platform with real-time messaging, feed, and media sharing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: 'https://social-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/media.jpg',
      caseStudy: {
        problem: 'Lack of a scalable, private social engine for niche communities.',
        solution: 'Built a custom feed algorithm and utilized Socket.io for a low-latency chat experience.',
        result: 'Successfully launched with 10k+ active users in the first month with zero performance lag.'
      },
    },
    {
      id: 5,
      title: 'Weather Application',
      description: 'Precise weather forecasting app with location-based services and 3D animations.',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Tailwind'],
      link: 'https://weather-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/weather2.jpg',
      caseStudy: {
        problem: 'Most weather apps were cluttered with ads and lacked intuitive UI animations.',
        solution: 'Created a minimal, ad-free interface using OpenWeather API and GSAP for fluid transitions.',
        result: 'Achieved 50k+ daily active users and high praise for its minimal design approach.'
      },
    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Modern blogging platform with full markdown support and SEO optimization.',
      technologies: ['React', 'Prisma', 'PostgreSQL', 'Tailwind'],
      link: 'https://blog-demo.com',
      github: 'https://github.com/DagneMan123',
      featured: false,
      image: '/src/assets/blog.jpg',
      caseStudy: {
        problem: 'Writers needed a fast platform that converted Markdown to SEO-friendly static pages.',
        solution: 'Built a custom rendering engine with Prisma for fast content retrieval and SEO optimization.',
        result: 'The platform hosts over 500 active blogs and maintains a 100/100 Google Lighthouse SEO score.'
      },
    }
  ];

  // 2. State Management & Data Fetching
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoadingTestimonials(true);
      try {
        const response = await fetch(`http://localhost:5000/api/testimonials/public?projectId=${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoadingTestimonials(false);
      }
    };
    if (projectId) fetchTestimonials();
  }, [projectId]);

  // 3. Filtering logic (Strict Project Matching)
  const filteredTestimonials = testimonials.filter(
    (t) => t.project_id !== null && String(t.project_id) === String(projectId)
  );

  const project = allProjects.find(p => String(p.id) === String(projectId));

  // 4. Interactive Image Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * 15);
    setRotateY(((centerX - x) / centerX) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // If ID doesn't exist in our array
  if (!project || !project.caseStudy) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
          <button onClick={() => navigate('/projects')} className="btn-primary">Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .case-study-container { animation: fadeInUp 0.6s ease-out; }
        .case-study-section { display: flex; gap: 1.5rem; margin-bottom: 2rem; }
        .case-study-icon { flex-shrink: 0; width: 3.5rem; height: 3.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .project-image-wrapper { position: relative; overflow: hidden; border-radius: 1rem; perspective: 1200px; }
        .project-image-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.1s ease-out; }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <button onClick={() => navigate('/projects')} className="text-primary hover:opacity-70 transition-all font-bold mb-8 flex items-center gap-2">
          ← Back to Projects
        </button>

        <h1 className="text-5xl font-bold mb-4 gradient-text">{project.title}</h1>
        <p className="text-light-muted dark:text-dark-muted text-xl mb-12">{project.description}</p>

        {/* Interactive Header Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="project-image-wrapper" style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
            <img src={project.image} alt={project.title} className="w-full h-[450px]" />
          </div>
        </div>

        <div className="case-study-container space-y-16">
          {/* Detailed Content */}
          <div className="case-study-section">
            <div className="case-study-icon bg-red-100 text-red-600">⚠</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">The Problem</h3>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">{project.caseStudy.problem}</p>
            </div>
          </div>

          <div className="case-study-section">
            <div className="case-study-icon bg-blue-100 text-blue-600">⚡</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">The Solution</h3>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">{project.caseStudy.solution}</p>
            </div>
          </div>

          <div className="case-study-section">
            <div className="case-study-icon bg-green-100 text-green-600">✓</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">The Result</h3>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed">{project.caseStudy.result}</p>
            </div>
          </div>

          {/* TESTIMONIALS SECTION */}
          <div className="pt-12 border-t border-primary/20">
            <h3 className="text-3xl font-bold mb-8">Project Feedback</h3>
            
            {loadingTestimonials ? (
              <p className="text-center py-10 opacity-60">Loading feedback...</p>
            ) : filteredTestimonials.length > 0 ? (
              <div className="grid gap-8">
                {filteredTestimonials.map((t) => (
                  <div key={t.id} className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      {t.image_url ? (
                        <img src={t.image_url} className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {t.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-lg">{t.author_name}</p>
                        <p className="text-sm opacity-60">{t.author_title}</p>
                      </div>
                    </div>
                    <p className="italic text-xl leading-relaxed text-light-text dark:text-dark-text">"{t.quote}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-primary/5 rounded-2xl p-10 border border-dashed border-primary/30 text-center">
                <p className="text-lg opacity-70 mb-6">No specific testimonials yet for this project. Be the first to share your experience!</p>
                <button 
                  onClick={() => navigate(`/submit-testimonial?projectId=${projectId}`)}
                  className="btn-primary px-8 py-3"
                >
                  Share Your Experience
                </button>
              </div>
            )}
            
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate(`/submit-testimonial?projectId=${projectId}`)}
                className="text-primary font-bold hover:underline"
              >
                + Submit another testimonial for this project
              </button>
            </div>
          </div>
        </div>

        {/* Footer Details */}
        <div className="mt-20 pt-12 border-t">
          <h3 className="text-2xl font-bold mb-8">Technologies Used</h3>
          <div className="flex flex-wrap gap-4 mb-12">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary text-center px-10 py-4 font-bold shadow-lg">
              Launch Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary text-center px-10 py-4 font-bold border-2">
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}