import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaHtml5, FaCss3Alt } from 'react-icons/fa';

const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'MongoDB', icon: <FaDatabase /> },
  { name: 'JavaScript', icon: <FaJsSquare /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  {name : 'Express.js', icon: <FaNodeJs />}, 
  {name : 'RESTful APIs', icon: <FaNodeJs />},
  {name : 'Git & GitHub', icon: <FaJsSquare />},
  {name :'python', icon: <FaJsSquare />},
  {name : 'C/C++', icon: <FaJsSquare />},
  {name : 'Machine Learning', icon: <FaJsSquare />},
];

const Skills = () => {
  return (
    <section>
      <h2>Skills</h2>
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