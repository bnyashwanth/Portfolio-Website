import experienceData from '../data/experienceData';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
  if (experienceData.length === 0) return null;

  return (
    <section id="experience" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 shadow-md dark:shadow-none hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FaBriefcase className="text-2xl text-purple-500" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {exp.title}
                  </h3>
                  <p className="text-text-muted text-lg font-medium">
                    {exp.company} • {exp.duration}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {exp.responsibilities.map((item, index) => (
                      <li key={index} className="text-text-muted flex items-start gap-2">
                        <span className="text-purple-500 mt-2">›</span>
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

