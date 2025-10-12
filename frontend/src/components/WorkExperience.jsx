// frontend/src/components/WorkExperience.jsx
import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experienceData = [
  {
    _id: 1,
    title: "Project RFP-AI (AI-Powered RFP Analysis Tool)",
    company: "Team Lead | Developer ",
    year: "Sept 2025 - Nov 2025",
    responsibilities: [
      "Assisted in developing and maintaining features for a client-facing web application using the MERN stack.",
      "Collaborated with the team on bug fixes and performance improvements.",
      
    ]


    
  },

  {
    _id: 2,
    title: "Built a Portfolio Website",
    company: "Personal Project",
    year: "Jan 2025 - Present",
    responsibilities: [
        "Designed and developed a personal portfolio website using React to showcase projects and skills.",
        "Implemented responsive design principles to ensure the website is accessible on various devices.",
        "Deployed the website using GitHub Pages for easy access and sharing."
    ]

  }

  
  // Add another job here if you have one
];

const WorkExperience = () => {
  if (experienceData.length === 0) return null;

  return (
    <section>
      <h2>Work Experience</h2>
      <div className="glass-card">
        {experienceData.map(exp => (
          <div key={exp._id} className="experience-entry">
            <FaBriefcase className="experience-icon" />
            <div>
              <h3>{exp.title}</h3>
              <p className="company">{exp.company} • {exp.year}</p>
              <ul className="responsibilities-list">
                {exp.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;