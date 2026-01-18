import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaHtml5, FaCss3Alt, FaPython, FaDocker, FaRobot, FaGitAlt, FaGithub, FaBrain, FaServer, FaLock } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiVercel, SiPostgresql, SiPrisma, SiTailwindcss, SiRender, SiPostman, SiExpress, SiJsonwebtokens } from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript', icon: <FaJsSquare /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'REST APIs', icon: <FaServer /> },
      { name: 'Authentication (JWT)', icon: <SiJsonwebtokens /> },
      { name: 'Prisma', icon: <SiPrisma /> },
    ]
  },
  {
    title: 'Artificial Intelligence',
    skills: [
      { name: 'Agentic AI (concepts & workflows)', icon: <FaRobot /> },
      { name: 'Generative AI (LLMs, prompts)', icon: <FaBrain /> },
      { name: 'Python (automation & AI integration)', icon: <FaPython /> },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: <FaDatabase /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ]
  },
  {
    title: 'Deployment & Tools',
    skills: [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Render', icon: <SiRender /> },
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Postman', icon: <SiPostman /> },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title} data-aos="fade-up" data-aos-delay={catIndex * 100}>
              <h3 className="text-2xl font-bold mb-6 text-center text-text-primary bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {category.title}
              </h3>
              <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-md dark:shadow-none transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-wrap justify-center gap-8">
                  {category.skills.map((skill, index) => (
                    <div
                      className="flex flex-col items-center gap-3 transition-transform hover:scale-110 hover:text-purple-500 text-text-muted group"
                      key={`${category.title}-${skill.name}`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 50}
                    >
                      <div className="text-4xl text-text-primary group-hover:text-purple-500 transition-colors">
                        {skill.icon}
                      </div>
                      <p className="font-medium text-sm text-text-primary group-hover:text-purple-500 transition-colors">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;