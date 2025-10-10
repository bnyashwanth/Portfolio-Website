import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaHtml5, FaCss3Alt } from 'react-icons/fa';

const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'MongoDB', icon: <FaDatabase /> },
  { name: 'JavaScript', icon: <FaJsSquare /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
];

const Skills = () => {
  return (
    <section>
      <h2>My Skills</h2>
      <div className="glass-card">
        <div className="skills-grid">
          {skills.map(skill => (
            <div className="glass-card skill-card" key={skill.name}>
              {skill.icon}
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;