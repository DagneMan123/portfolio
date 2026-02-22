const experiences = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Senior Full-Stack Developer',
    duration: '2022 - Present',
    description: 'Led development of scalable web applications, mentored junior developers, and architected microservices infrastructure.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 2,
    company: 'Digital Innovations Ltd.',
    position: 'Full-Stack Developer',
    duration: '2020 - 2022',
    description: 'Developed and maintained multiple client projects, implemented CI/CD pipelines, and optimized application performance.',
    technologies: ['React', 'Express', 'MongoDB', 'TypeScript', 'AWS']
  },
  {
    id: 3,
    company: 'StartUp Hub',
    position: 'Junior Developer',
    duration: '2019 - 2020',
    description: 'Built responsive web interfaces, fixed bugs, and contributed to backend API development.',
    technologies: ['JavaScript', 'React', 'Node.js', 'MySQL']
  }
]

export default function Experience() {
  return (
    <section className="py-20 bg-light-surface dark:bg-dark-surface">
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes numberCount {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes lineGrow {
          from {
            height: 0;
          }
          to {
            height: 48px;
          }
        }

        .exp-card {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .exp-card:nth-child(1) { animation-delay: 0.1s; }
        .exp-card:nth-child(2) { animation-delay: 0.2s; }
        .exp-card:nth-child(3) { animation-delay: 0.3s; }

        .exp-number {
          animation: numberCount 0.6s ease-out forwards;
          opacity: 0;
        }

        .exp-number:nth-child(1) { animation-delay: 0.2s; }
        .exp-number:nth-child(2) { animation-delay: 0.3s; }
        .exp-number:nth-child(3) { animation-delay: 0.4s; }

        .exp-line {
          animation: lineGrow 0.8s ease-out forwards;
          height: 0;
        }

        .exp-line:nth-child(1) { animation-delay: 0.1s; }
        .exp-line:nth-child(2) { animation-delay: 0.2s; }

        .exp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
        }

        .dark .exp-card:hover {
          box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
        }

        .exp-number {
          transition: all 0.3s ease;
        }

        .exp-card:hover .exp-number {
          transform: scale(1.1);
          color: #2563eb;
        }

        .dark .exp-card:hover .exp-number {
          color: #0ea5e9;
        }

        .exp-title {
          transition: all 0.3s ease;
        }

        .exp-card:hover .exp-title {
          color: #2563eb;
        }

        .dark .exp-card:hover .exp-title {
          color: #0ea5e9;
        }

        .tech-badge {
          animation: slideInUp 0.4s ease-out forwards;
          opacity: 0;
        }

        .tech-badge:nth-child(1) { animation-delay: 0.3s; }
        .tech-badge:nth-child(2) { animation-delay: 0.35s; }
        .tech-badge:nth-child(3) { animation-delay: 0.4s; }
        .tech-badge:nth-child(4) { animation-delay: 0.45s; }
        .tech-badge:nth-child(5) { animation-delay: 0.5s; }

        .tech-badge:hover {
          transform: translateY(-3px) scale(1.05);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Professional Experience</h2>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            My journey in the tech industry and key roles I've held
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative exp-card">
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-20 w-1 exp-line bg-gradient-to-b from-primary to-transparent dark:from-accent"></div>
              )}
              
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="exp-number w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl hover:shadow-lg hover:shadow-primary/50 dark:hover:shadow-accent/50 transition-all">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1 card-hover p-6 group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h3 className="exp-title text-2xl font-bold text-primary dark:text-accent">{exp.position}</h3>
                      <p className="text-light-muted dark:text-dark-muted font-semibold group-hover:text-primary dark:group-hover:text-accent transition-colors">{exp.company}</p>
                    </div>
                    <span className="text-sm text-light-muted dark:text-dark-muted whitespace-nowrap font-semibold">{exp.duration}</span>
                  </div>

                  <p className="text-light-text dark:text-dark-text mb-4 leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tech-badge badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
