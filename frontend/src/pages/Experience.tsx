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
      </div>
    </div>
  )
}
