// frontend/src/components/Projects.jsx

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.jsx';
import projectsData from '../data/projectsData.js';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(projectsData);
    }, []);

    return (
        <section className="projects-container reveal">
            <h2>My Projects</h2>

            <div className="projects-container">
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
