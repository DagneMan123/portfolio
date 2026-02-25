import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 90) % 360)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-light-bg to-light-surface dark:from-dark-bg dark:to-dark-surface pt-20 overflow-hidden">
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

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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

        @keyframes liftIn1 {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          32% {
            opacity: 1;
            transform: translateY(0);
          }
          47% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes liftIn2 {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          48% {
            opacity: 0;
            transform: translateY(40px);
          }
          63% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          95% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes liftIn3 {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          96% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-subtitle {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .hero-description {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .hero-buttons {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }

        .hero-socials {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }

        .hero-image {
          animation: slideInRight 0.8s ease-out 1s both;
        }

        .rotating-text {
          display: inline-block;
          min-width: 280px;
          height: 1.2em;
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 640px) {
          .rotating-text {
            min-width: 200px;
          }
        }

        .rotating-text span {
          display: block;
          position: absolute;
          font-weight: 600;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          width: 100%;
        }

        .rotating-text span:nth-child(1) {
          animation: liftIn1 9s infinite ease-out;
        }

        .rotating-text span:nth-child(2) {
          animation: liftIn2 9s infinite ease-out;
        }

        .rotating-text span:nth-child(3) {
          animation: liftIn3 9s infinite ease-out;
        }

        .social-icon {
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-5px) scale(1.2);
          color: #2563eb;
        }

        .dark .social-icon:hover {
          color: #0ea5e9;
        }

        .btn-hover {
          position: relative;
          overflow: hidden;
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s ease;
          z-index: -1;
        }

        .btn-hover:hover::before {
          left: 100%;
        }

        .image-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .image-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes imageZoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes imagePulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes imageRotate {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(2deg) scale(1.03);
          }
        }

        @keyframes imageBorder {
          0%, 100% {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.1);
          }
          50% {
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 30px rgba(139, 92, 246, 0.2);
          }
        }

        .image-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-hover:hover {
          animation: imageZoom 2s ease-in-out infinite;
        }

        .hero-image-container {
          position: relative;
          transition: all 0.3s ease;
          perspective: 1200px;
          width: 320px;
          height: 320px;
        }

        .cubic-carousel {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s ease-out;
        }

        .cubic-face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          overflow: hidden;
          backface-visibility: hidden;
          border: 2px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
        }

        .cubic-face img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .cubic-face:hover img {
          transform: scale(1.1);
          filter: brightness(1.15);
        }

        .cubic-face:nth-child(1) {
          transform: rotateY(0deg) translateZ(160px);
        }

        .cubic-face:nth-child(2) {
          transform: rotateY(90deg) translateZ(160px);
        }

        .cubic-face:nth-child(3) {
          transform: rotateY(180deg) translateZ(160px);
        }

        .cubic-face:nth-child(4) {
          transform: rotateY(270deg) translateZ(160px);
        }

        .cubic-carousel.rotate-90 {
          transform: rotateY(-90deg);
        }

        .cubic-carousel.rotate-180 {
          transform: rotateY(-180deg);
        }

        .cubic-carousel.rotate-270 {
          transform: rotateY(-270deg);
        }

        .cubic-carousel.rotate-360 {
          transform: rotateY(-360deg);
        }

        .hero-image-container:hover {
          animation: imageBorder 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="hero-subtitle text-primary font-semibold text-lg">Welcome to my portfolio</p>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-light-text dark:text-dark-text">
                Hey, I'm <span className="gradient-text">Dagne</span>
              </h1>
              <h2 className="hero-subtitle text-2xl sm:text-3xl text-light-muted dark:text-dark-muted font-semibold">
                <span className="rotating-text">
                  <span>Frontend Developer</span>
                  <span>Backend Developer</span>
                  <span>Full-Stack Developer</span>
                </span>
              </h2>
            </div>

            <p className="hero-description text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-xl">
              I build scalable, modern web applications with React, TypeScript, and Node.js. 
              Passionate about clean code, user experience, and solving complex problems.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/projects" 
                className="btn-primary btn-hover text-center group relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="btn-secondary btn-hover text-center group relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get In Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="hero-socials flex gap-6 pt-8">
              <a 
                href="https://github.com/DagneMan123" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon text-light-muted dark:text-dark-muted"
                title="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/dagnedeveloper" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon text-light-muted dark:text-dark-muted"
                title="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.659 1.191-1.598 2.905-1.598 2.121 0 3.71 1.386 3.71 4.365v5.515zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.955.77-1.708 1.963-1.708 1.192 0 1.915.753 1.94 1.708 0 .949-.748 1.707-1.988 1.707zm1.582 11.019H3.656V9.806h3.263v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon text-light-muted dark:text-dark-muted"
                title="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.856.973 5 5 0 00-8.66 4.59 14.23 14.23 0 01-10.3-5.208 5 5 0 001.55 6.573 5 5 0 01-2.26-.616v.06a5 5 0 004.001 4.905 5 5 0 01-2.26.086 5 5 0 004.678 3.488 10.02 10.02 0 01-6.177 2.132c-.398 0-.79-.023-1.175-.067a14.201 14.201 0 007.713 2.262c9.256 0 14.336-7.662 14.336-14.322 0-.218-.005-.436-.015-.653a10.23 10.23 0 002.516-2.61z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-image hidden lg:flex justify-center">
            <div className="relative w-80 h-80 group hero-image-container">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-3xl opacity-10 dark:opacity-20 image-glow group-hover:opacity-30 transition-opacity duration-300"></div>
              <div 
                className="cubic-carousel"
                style={{
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                  <img src="/src/assets/dagne.jpg" alt="Portfolio 1" />
                </div>
                <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                  <img src="/src/assets/mom.jpg" alt="Portfolio 2" />
                </div>
                <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                  <img src="/src/assets/jj.jpg" alt="Portfolio 3" />
                </div>
                <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                  <img src="/src/assets/hena.jpg" alt="Portfolio 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
