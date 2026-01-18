<<<<<<< HEAD
import { useState } from 'react';
import projectsData from '../data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" data-aos="fade-up">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onOpen={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;
=======
// frontend/src/components/Projects.jsx - NEW VERSION

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard.jsx'; // Make sure .jsx is here

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/projects/')
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
>>>>>>> d1ee2f1 (Initial portfolio commit)
