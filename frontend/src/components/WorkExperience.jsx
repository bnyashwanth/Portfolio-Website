import React from 'react';
import { FaBriefcase } from 'react-icons/fa';



  
const experienceData = [
  {
    _id: 1,
    title: "Software Development Engineer Intern",
    company: "YugaYatra Retail (OPC) Pvt. Ltd.",
    year: "Dec 2025 – Present",
    responsibilities: [
      "Working on building and maintaining backend services and APIs for client-facing web applications.",
      "Contributing to full-stack development using the MERN stack with a focus on performance and scalability.",
      "Collaborating with senior developers on bug fixes, feature enhancements, and code optimization.",
      "Gaining hands-on experience with production-level codebases and software engineering best practices."
    ],
  },
  // {
  //   _id: 2,
  //   title: "AI Chatbot & Agentic AI Developer",
  //   company: "Personal Project",
  //   year: "2025",
  //   responsibilities: [
  //     "Built and deployed a personal AI chatbot using Large Language Model (LLM) APIs and Hugging Face.",
  //     "Implemented Agentic AI concepts such as task planning, tool usage, and contextual memory.",
  //     "Integrated AI features into a web application and deployed it for real-world usage."
  //   ],
  // },
  // {
  //   _id: 3,
  //   title: "Portfolio Website Developer",
  //   company: "Personal Project",
  //   year: "Jan 2025 – Present",
  //   responsibilities: [
  //     "Designed and developed a personal portfolio website using React to showcase projects and skills.",
  //     "Implemented responsive UI and modern design principles for cross-device compatibility.",
  //     "Deployed the website using GitHub Pages for easy access and sharing."
  //   ],
  // }
];


const WorkExperience = () => {
  if (experienceData.length === 0) return null;

  return (
    <section >
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