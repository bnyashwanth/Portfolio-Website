// frontend/src/components/Projects.jsx - NEW VERSION

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard.jsx'; // Make sure .jsx is here

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        
        axios.get(`${import.meta.env.VITE_API_URL}/projects/`)
            .then(response => setProjects(response.data))
            .catch(error => console.log("Error fetching projects:", error));
    }, []);

    return (
        <section>
            <h2>My Projects</h2>
            {/* Add the new container div below */}
            <div className="projects-container">
                {projects.map(project => (
                    <ProjectCard project={project} key={project._id} />
                ))}
            </div>
        </section>
    );
};

export default Projects;