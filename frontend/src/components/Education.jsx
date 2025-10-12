// frontend/src/components/Education.jsx - UPDATED

import React from 'react';
import { FaUniversity } from 'react-icons/fa';

// 1. Define your education data directly in an array
const educationData = [
  {
    _id: 1,
    institution: "Dayananda Sagar College of Engineering",
    degree: "B.E CSE (Robotics and AI)",
    year: "2018 - 2022",
    cgpa: "9.275 / 10.0",
    achievements: [
      "Participated in Smart India Hackathon 2025",
      "Published a paper on Machine Learning",
      "Dean's List for Academic Excellence"
    ]
  },
  
  // Add more education entries here if you need them
];

const Education = () => {
  // 2. Remove useState, useEffect, and axios. The component is now much simpler.
  return (
    <section>
      <h2>My Education</h2>
      <div className="glass-card">
        {/* 3. Map directly over your new educationData array */}
        {educationData.map(edu => (
          <div key={edu._id} className="education-entry">
            <FaUniversity className="education-icon" />
            <div>
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.institution}</p>
              <p className="year">{edu.year}</p>

              {edu.cgpa && <p className="cgpa">CGPA: {edu.cgpa}</p>}
              
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="achievements-list">
                  {edu.achievements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;