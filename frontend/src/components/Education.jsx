import educationData from '../data/educationData';
import { FaUniversity } from 'react-icons/fa';

const Education = () => {
  if (educationData.length === 0) return null;

  return (
    <section id="education" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 shadow-md dark:shadow-none hover:shadow-lg hover:scale-[1.01]"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FaUniversity className="text-2xl text-purple-500" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-text-muted text-lg">{edu.institution}</p>
                  <p className="text-text-muted">{edu.year}</p>
                  {edu.cgpa && (
                    <p className="text-text-primary font-semibold">CGPA: {edu.cgpa}</p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="pt-4 space-y-2">
                      <h4 className="text-text-primary font-semibold">Achievements:</h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, index) => (
                          <li key={index} className="text-text-muted flex items-start gap-2">
                            <span className="text-purple-500 mt-1.5">›</span>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
