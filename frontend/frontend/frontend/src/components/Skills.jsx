import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaHtml5, FaCss3Alt, FaPython, FaDocker } from 'react-icons/fa';

const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'MongoDB', icon: <FaDatabase /> },
  { name: 'JavaScript', icon: <FaJsSquare /> },
  // { name: 'Python', icon: <FaPython /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-md dark:shadow-none transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-wrap justify-center gap-8">
            {skills.map((skill, index) => (
              <div
                className="flex flex-col items-center gap-3 transition-transform hover:scale-110 hover:text-purple-500 text-text-muted"
                key={skill.name}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="text-4xl text-text-primary hover:text-purple-500 transition-colors">
                  {skill.icon}
                </div>
                <p className="font-medium text-sm">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;