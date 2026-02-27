import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Testimonials from './pages/Testimonials'
import Experience from './pages/Experience'
import Services from './pages/Services'
import Contact from './pages/Contact'
import CaseStudyDetail from './pages/CaseStudyDetail'
import SubmitTestimonial from './pages/SubmitTestimonial'
import EditTestimonial from './pages/EditTestimonial'
import AdminTestimonials from './pages/AdminTestimonials'

function App() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <style>{`
        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pageExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .page-transition {
          animation: pageEnter 0.6s ease-out forwards;
        }

        .page-exit {
          animation: pageExit 0.3s ease-in forwards;
        }
      `}</style>
      <Navbar />
      <main className={`flex-grow transition-all duration-500 ${isTransitioning ? 'page-exit' : 'page-transition'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
          <Route path="/edit/:token" element={<EditTestimonial />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/case-study/:projectId" element={<CaseStudyDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
