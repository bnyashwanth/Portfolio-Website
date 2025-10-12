// frontend/src/components/WorkExperience.jsx
import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experienceData = [
  {
    _id: 1,
    title: "Software Developer Intern",
    company: "Tech Solutions Inc.",
    year: "June 2023 - Aug 2023",
    responsibilities: [
      "Assisted in developing and maintaining features for a client-facing web application using the MERN stack.",
      "Collaborated with the team on bug fixes and performance improvements.",
      "Participated in daily stand-ups and sprint planning meetings."
    ]
  },
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