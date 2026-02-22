import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import '../styles/navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">Dagne Developer</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-light-text dark:text-dark-text hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-primary hover:text-white transition-all"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l.707-.707a1 1 0 000-1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM9 4a1 1 0 100-2 1 1 0 000 2zm6.464 12.05l-2.12-2.12a1 1 0 10-1.414 1.414l2.12 2.12a1 1 0 001.414-1.414l-.707-.707a1 1 0 000-1.414zM9 16a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          <div className={`${isOpen ? 'block' : 'hidden'} md:flex gap-1 absolute md:static top-16 left-0 right-0 bg-light-surface dark:bg-dark-surface md:bg-transparent p-4 md:p-0 flex-col md:flex-row`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all relative font-medium ${
                  isActive(link.path)
                    ? 'bg-primary text-white shadow-lg'
                    : link.label === 'Home'
                    ? 'text-light-text dark:text-dark-text hover:text-light-text dark:hover:text-dark-text'
                    : 'text-light-text dark:text-dark-text nav-link-hover'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
