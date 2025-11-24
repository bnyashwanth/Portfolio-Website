import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-card project-card" style={{ marginBottom: '2rem' }}>
      <img src={project.imageUrl} alt={project.title} />
      <h3>{project.title}</h3>
      {/* <div className="tech-stack">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div> */}
      <p>{project.description}</p>
      <div className="card-buttons">
  <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-modern"
  >
    <FaExternalLinkAlt /> View Live
  </a>

  <a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-modern"
  >
    <FaGithub /> Source Code
  </a>
</div>

    </div>
  );
};

export default ProjectCard;