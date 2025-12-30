import React from 'react';
import { FaBriefcase } from 'react-icons/fa';



  
const experienceData = [
  {
  _id: 1,
  title: "Freelance Full-Stack Web Developer",
  company: "Self-Initiated Projects",
  year: "2024 – Present",
  responsibilities: [
    "Designed and developed end-to-end MERN stack applications, handling frontend, backend APIs, and database architecture.",
    "Built real-world web applications with a focus on scalability, performance, and clean code practices.",
    "Implemented RESTful APIs and integrated MongoDB for efficient data persistence.",
    "Managed application deployment using Vercel, Render, and MongoDB Atlas."
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