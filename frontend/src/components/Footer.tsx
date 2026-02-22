import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .footer-section {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .footer-section:nth-child(1) { animation-delay: 0.1s; }
        .footer-section:nth-child(2) { animation-delay: 0.2s; }
        .footer-section:nth-child(3) { animation-delay: 0.3s; }
        .footer-section:nth-child(4) { animation-delay: 0.4s; }

        .footer-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease-out;
        }

        .footer-link:hover {
          color: #3b82f6;
          transform: translateX(4px);
        }

        .footer-link:hover::before {
          width: 100%;
        }

        .footer-brand {
          animation: slideInUp 0.6s ease-out 0.05s both;
        }

        .footer-bottom {
          animation: fadeIn 0.8s ease-out 0.5s both;
          opacity: 0;
        }

        .social-link {
          transition: all 0.3s ease;
          display: inline-block;
        }

        .social-link:hover {
          transform: translateY(-3px) scale(1.1);
          color: #3b82f6;
        }

        .footer-divider {
          animation: slideInUp 0.6s ease-out 0.45s both;
          opacity: 0;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="footer-section footer-brand">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-lg font-bold gradient-text group-hover:scale-105 transition-transform duration-300 inline-block">Dagne Developer</span>
            </div>
            <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
              Building scalable web applications with modern technologies and best practices.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="font-semibold mb-4 text-light-text dark:text-dark-text">Navigation</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="footer-link text-light-muted dark:text-dark-muted text-sm">Home</Link>
              <Link to="/about" className="footer-link text-light-muted dark:text-dark-muted text-sm">About</Link>
              <Link to="/projects" className="footer-link text-light-muted dark:text-dark-muted text-sm">Projects</Link>
              <Link to="/experience" className="footer-link text-light-muted dark:text-dark-muted text-sm">Experience</Link>
              <Link to="/contact" className="footer-link text-light-muted dark:text-dark-muted text-sm">Contact</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="font-semibold mb-4 text-light-text dark:text-dark-text">Social</h4>
            <div className="flex flex-col space-y-3">
              <a href="https://github.com/DagneMan123" target="_blank" rel="noopener noreferrer" className="footer-link text-light-muted dark:text-dark-muted text-sm">GitHub</a>
              <a href="https://linkedin.com/in/dagnedeveloper" target="_blank" rel="noopener noreferrer" className="footer-link text-light-muted dark:text-dark-muted text-sm">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link text-light-muted dark:text-dark-muted text-sm">Twitter</a>
              <a href="mailto:aydenfudagne@gmail.com" className="footer-link text-light-muted dark:text-dark-muted text-sm">Email</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="font-semibold mb-4 text-light-text dark:text-dark-text">Contact</h4>
            <div className="flex flex-col space-y-4 text-sm">
              <div className="text-light-muted dark:text-dark-muted hover:text-primary transition-colors duration-300">
                <p className="text-primary dark:text-accent font-semibold mb-1">Email:</p>
                <p>aydenfudagne@gmail.com</p>
              </div>
              <div className="text-light-muted dark:text-dark-muted hover:text-primary transition-colors duration-300">
                <p className="text-primary dark:text-accent font-semibold mb-1">Location:</p>
                <p>Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider border-t border-light-border dark:border-dark-border pt-8">
          <div className="footer-bottom flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center text-sm text-light-muted dark:text-dark-muted">
            <p>&copy; {currentYear} Dagne Developer. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a href="#" className="social-link hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="social-link hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
