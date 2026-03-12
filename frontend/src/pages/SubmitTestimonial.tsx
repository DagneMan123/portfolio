import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TestimonialForm from '../components/TestimonialForm';

export default function SubmitTestimonial() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Safe parsing of projectId from URL
  const projectIdParam = searchParams.get('projectId');
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;
  
  const [editLink, setEditLink] = useState('');

  const handleSuccess = (link: string) => {
    // This function must be called by the TestimonialForm on success
    setEditLink(link);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20">
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

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Only show if not submitted */}
        {!editLink && (
          <div className="section-animate text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 gradient-text">Share Your Feedback</h1>
            <p className="text-light-muted dark:text-dark-muted text-lg">
              Help others by sharing your experience working with me
            </p>
          </div>
        )}

        {editLink ? (
          /* SUCCESS VIEW - This shows when setEditLink is called */
          <div key="success-card" className="section-animate bg-white dark:bg-dark-surface p-10 rounded-3xl shadow-2xl text-center space-y-8 border border-primary/20">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-4xl text-green-600">
                ✓
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-primary">Thank You!</h2>
              <p className="text-light-muted dark:text-dark-muted text-lg leading-relaxed">
                Your testimonial has been submitted successfully and is now pending approval.
              </p>
            </div>

            <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-2xl border border-primary/10 space-y-3">
              <p className="text-xs uppercase tracking-widest font-bold opacity-60">Your Private Edit Link</p>
              <div className="bg-white dark:bg-black/20 p-3 rounded border select-all cursor-pointer">
                <code className="text-primary font-mono text-sm break-all">
                  {window.location.origin}/edit/{editLink.split('/').pop()}
                </code>
              </div>
              <p className="text-[10px] opacity-50 italic">Copy and save this link to modify your testimonial later.</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/')}
                className="btn-primary w-full py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div key="form-container" className="section-animate bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-lg border border-primary/5">
            <TestimonialForm onSuccess={handleSuccess} projectId={projectId} />
          </div>
        )}
      </div>
    </div>
  );
}