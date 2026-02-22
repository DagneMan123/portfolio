const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', percentage: 95 },
      { name: 'TypeScript', percentage: 90 },
      { name: 'Tailwind CSS', percentage: 92 },
      { name: 'Next.js', percentage: 88 },
      { name: 'Redux', percentage: 85 },
      { name: 'Vite', percentage: 87 }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', percentage: 93 },
      { name: 'Express', percentage: 91 },
      { name: 'PostgreSQL', percentage: 89 },
      { name: 'MongoDB', percentage: 86 },
      { name: 'REST APIs', percentage: 94 },
      { name: 'GraphQL', percentage: 82 }
    ]
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git', percentage: 96 },
      { name: 'Docker', percentage: 84 },
      { name: 'AWS', percentage: 85 },
      { name: 'CI/CD', percentage: 83 },
      { name: 'Linux', percentage: 88 },
      { name: 'Webpack', percentage: 80 }
    ]
  },
  {
    category: 'Other',
    skills: [
      { name: 'JavaScript', percentage: 97 },
      { name: 'HTML/CSS', percentage: 95 },
      { name: 'Figma', percentage: 78 },
      { name: 'Agile', percentage: 89 },
      { name: 'Testing', percentage: 86 },
      { name: 'Performance', percentage: 87 }
    ]
  }
]

interface SkillItemProps {
  name: string
  percentage: number
}

function SkillItem({ name, percentage }: SkillItemProps) {
  return (
    <div className="group mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-primary dark:group-hover:text-accent transition-colors">
          {name}
        </span>
        <span className="text-xs font-bold text-primary dark:text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {percentage}%
        </span>
      </div>
      
      <div className="relative h-2 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-primary/50 dark:group-hover:shadow-accent/50"
          style={{
            width: `${percentage}%`,
            animation: `fillBar 1.2s ease-out forwards`
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="py-20 bg-light-surface dark:bg-dark-surface">
      <style>{`
        @keyframes fillBar {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: var(--width, 100%);
            opacity: 1;
          }
        }

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .skill-card {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .skill-card:nth-child(1) { animation-delay: 0.1s; }
        .skill-card:nth-child(2) { animation-delay: 0.2s; }
        .skill-card:nth-child(3) { animation-delay: 0.3s; }
        .skill-card:nth-child(4) { animation-delay: 0.4s; }

        .skill-card:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and skills I've mastered over years of development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((skillGroup, groupIndex) => (
            <div
              key={skillGroup.category}
              className="skill-card card-hover p-6 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${groupIndex * 0.1}s` }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">
                  {skillGroup.category}
                </h3>
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>

              <div className="space-y-0">
                {skillGroup.skills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
              24+
            </div>
            <p className="text-light-muted dark:text-dark-muted font-semibold">Technologies</p>
            <p className="text-sm text-light-muted dark:text-dark-muted mt-2">Proficient in modern tech stack</p>
          </div>

          <div className="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
              90%+
            </div>
            <p className="text-light-muted dark:text-dark-muted font-semibold">Average Proficiency</p>
            <p className="text-sm text-light-muted dark:text-dark-muted mt-2">High expertise across all areas</p>
          </div>

          <div className="card p-8 text-center hover:shadow-lg transition-all duration-300 group">
            <div className="text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
              5+
            </div>
            <p className="text-light-muted dark:text-dark-muted font-semibold">Years Experience</p>
            <p className="text-sm text-light-muted dark:text-dark-muted mt-2">Continuous learning & growth</p>
          </div>
        </div>
      </div>
    </section>
  )
}
