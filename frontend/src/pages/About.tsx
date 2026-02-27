import { useEffect, useState } from 'react'

export default function About() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 90) % 360)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

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
          width: 320px;
          height: 320px;
        }

        @media (max-width: 1024px) {
          .about-image-container {
            width: 280px;
            height: 280px;
          }
        }

        @media (max-width: 768px) {
          .about-image-container {
            width: 240px;
            height: 240px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .about-image-container {
            width: 200px;
            height: 200px;
          }
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

        .about-image-container:hover {
          animation: imageBorder 2s ease-in-out infinite;
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

        .journey-dropdown {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.05);
          border-left: 3px solid rgba(37, 99, 235, 0.3);
          border-radius: 0.5rem;
          animation: slideDown 0.15s ease-out;
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
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="section-animate grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative about-image-container group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-3xl opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div 
              className="cubic-carousel"
              style={{
                transform: `rotateY(${rotation}deg)`
              }}
            >
              <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                <img src="/src/assets/dagne.jpg" alt="About 1" />
              </div>
              <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                <img src="/src/assets/mom.jpg" alt="About 2" />
              </div>
              <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                <img src="/src/assets/jj.jpg" alt="About 3" />
              </div>
              <div className="cubic-face bg-gradient-to-br from-primary/10 to-accent/10">
                <img src="/src/assets/hena.jpg" alt="About 4" />
              </div>
              
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

        {/* Journey Timeline Section */}
        <div className="section-animate mt-20">
          <h2 className="text-4xl font-bold mb-16 text-center gradient-text">Professional Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2021 */}
            <div className="stagger-item card-hover p-8 border border-light-border dark:border-dark-border rounded-2xl hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="text-5xl">
                  📅
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    2023
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">The Genesis (Foundations)</h3>
                  <p className="text-light-muted dark:text-dark-muted mb-4 text-sm leading-relaxed">
                    Started the journey into the digital world. Mastered the core building blocks of the web: HTML5, CSS3, and JavaScript.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge text-xs">HTML5</span>
                    <span className="badge text-xs">CSS3</span>
                    <span className="badge text-xs">JavaScript</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2022 */}
            <div className="stagger-item card-hover p-8 border border-light-border dark:border-dark-border rounded-2xl hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="text-5xl">
                  🚀
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    2024
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Exploring Frameworks (Skill Expansion)</h3>
                  <p className="text-light-muted dark:text-dark-muted mb-4 text-sm leading-relaxed">
                    Focused on modern styling and efficiency. Adopted Tailwind CSS and started building component-based UIs with React.js.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge text-xs">React.js</span>
                    <span className="badge text-xs">Tailwind CSS</span>
                    <span className="badge text-xs">Component Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2023 */}
            <div className="stagger-item card-hover p-8 border border-light-border dark:border-dark-border rounded-2xl hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="text-5xl">
                  ⚡
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    2025
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Full-Stack Maturity (Professional Projects)</h3>
                  <p className="text-light-muted dark:text-dark-muted mb-4 text-sm leading-relaxed">
                    Bridged the gap between frontend and backend. Specialized in Next.js and started delivering production-ready projects for clients.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge text-xs">Next.js</span>
                    <span className="badge text-xs">Full-Stack</span>
                    <span className="badge text-xs">Production Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 - Present */}
            <div className="stagger-item card-hover p-8 border border-light-border dark:border-dark-border rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-4">
                <div className="text-5xl">
                  ✨
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold text-lg">
                    2025+
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">Mastery & Innovation (The "Tbeb" Era)</h3>
                  <p className="text-light-muted dark:text-dark-muted mb-4 text-sm leading-relaxed">
                    Pushing the boundaries of web design with advanced animations, TypeScript, and clean architecture. Focused on creating "Digital Experiences," not just websites.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge text-xs">TypeScript</span>
                    <span className="badge text-xs">Advanced Animations</span>
                    <span className="badge text-xs">Clean Architecture</span>
                    <span className="badge text-xs">Digital Experiences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
