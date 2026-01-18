import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, onOpen }) => {
  return (
    <div className="glass-card project-card" style={{ marginBottom: '2rem' }}>
      <img src={project.imageUrl} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="card-buttons">
        <button
          onClick={onOpen}
          className="btn btn-primary"
          style={{
            background: 'var(--accent-color-blue)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          View Details
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-modern"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--font-color-primary)' }}
        >
          <FaGithub /> Code
        </a>
      </div>

    </div>
  );
};

export default ProjectCard;