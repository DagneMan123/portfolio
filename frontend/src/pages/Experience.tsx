import ExperienceComponent from '../components/Experience'

export default function ExperiencePage() {
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

        .journey-toggle {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
          color: #2563eb;
          cursor: pointer;
        }

        .journey-toggle.expanded {
          transform: rotate(180deg);
        }

        .journey-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .journey-content {
          animation: slideDown 0.3s ease-out;
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
        <div className="section-animate text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Professional Experience</h1>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            My career journey and the roles I've held in the tech industry
          </p>
        </div>

        <div className="section-animate section-hover">
          <ExperienceComponent />
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
                    Bridged the gap between frontend and backend. Specialized in react.tsx and started delivering production-ready projects for clients.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge text-xs">React.tsx</span>
                    <span className="badge text-xs">Node.js/Express</span>
                    <span className="badge text-xs">Postgres</span>
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
