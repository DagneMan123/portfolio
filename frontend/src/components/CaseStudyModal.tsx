import { CaseStudy, Testimonial } from '../types/index'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  caseStudy: CaseStudy
  testimonial?: Testimonial
}

export default function CaseStudyModal({
  isOpen,
  onClose,
  projectTitle,
  caseStudy,
  testimonial
}: CaseStudyModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .modal-content {
            animation: slideUp 0.3s ease-out;
          }
        `}</style>

        <div
          className="modal-content bg-light-surface dark:bg-dark-surface rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{projectTitle} - Case Study</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* The Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">The Problem</h3>
              </div>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed ml-13">
                {caseStudy.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">The Solution</h3>
              </div>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed ml-13">
                {caseStudy.solution}
              </p>
            </div>

            {/* The Result */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">The Result</h3>
              </div>
              <p className="text-light-muted dark:text-dark-muted leading-relaxed ml-13">
                {caseStudy.result}
              </p>
            </div>

            {/* Testimonial */}
            {testimonial && (
              <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    {testimonial.logo && (
                      <img
                        src={testimonial.logo}
                        alt={testimonial.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-light-text dark:text-dark-text italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold text-light-text dark:text-dark-text">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-light-muted dark:text-dark-muted">
                          {testimonial.title} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-light-bg dark:bg-dark-bg p-6 border-t border-light-border dark:border-dark-border flex justify-end">
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
