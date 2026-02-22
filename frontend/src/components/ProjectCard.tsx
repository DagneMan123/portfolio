import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Project } from '../types/index'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleImageClick = () => {
    if (project.caseStudy) {
      navigate(`/case-study/${project.id}`)
    }
  }

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

  return (
    <div className="stagger-item group card-hover overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .case-study-overlay {
          animation: fadeIn 0.3s ease-out;
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

        .case-study-text {
          flex: 1;
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

        .image-container-wrapper {
          position: relative;
          overflow: hidden;
          height: 240px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          perspective: 1200px;
          cursor: pointer;
        }

        .project-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .project-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .project-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
          z-index: 10;
          pointer-events: none;
          transform-style: preserve-3d;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .image-container-wrapper:hover .project-image-container::before {
          opacity: 1;
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
          transform-style: preserve-3d;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .image-container-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent);
          z-index: 20;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-container-wrapper:hover::before {
          opacity: 1;
        }

        .case-study-overlay-content {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .case-study-overlay-content::-webkit-scrollbar {
          width: 4px;
        }

        .case-study-overlay-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .case-study-overlay-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }

        .case-study-overlay-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .close-button {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          hover: rgba(255, 255, 255, 0.3);
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

        @keyframes float3d {
          0%, 100% {
            transform: translateZ(0px);
          }
          50% {
            transform: translateZ(20px);
          }
        }

        .image-container-wrapper:hover .project-image-container img {
          animation: float3d 2s ease-in-out infinite;
        }
      `}</style>

      {/* Project Image */}
      <div 
        className="image-container-wrapper"
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="project-image-container"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold group-hover:text-primary dark:group-hover:text-accent transition-colors flex-1 text-light-text dark:text-dark-text">{project.title}</h3>
          {project.featured && <span className="text-xs bg-primary text-white px-2 py-1 rounded">Featured</span>}
        </div>
        
        <p className="text-light-muted dark:text-dark-muted mb-4 leading-relaxed text-sm">{project.description}</p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 btn-primary text-center text-sm py-2">
            Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 btn-secondary text-center text-sm py-2">
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
