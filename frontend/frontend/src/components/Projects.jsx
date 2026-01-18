import { useState } from 'react';
import projectsData from '../data/projectsData';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16" data-aos="fade-up">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-surface/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-md dark:shadow-none hover:shadow-xl h-full flex flex-col"
              >
                <div className="h-40 overflow-hidden relative group">
                  <img
                    src={project.imageUrl || "https://placehold.co/600x400/1a1a1a/purple?text=Project"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium px-4 py-2 rounded-lg bg-purple-600/80 backdrop-blur-sm">View Details</span>
                  </div>
                </div>
                <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {project.title}
                  </h3>

                  {project.problem ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Problem</h4>
                        <p className="text-text-muted text-sm leading-relaxed">{project.problem}</p>
                      </div>
                      {project.approach && (
                        <div>
                          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Approach</h4>
                          <p className="text-text-muted text-sm leading-relaxed">{project.approach}</p>
                        </div>
                      )}
                      {project.impact && (
                        <div>
                          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Impact</h4>
                          <p className="text-text-muted text-sm leading-relaxed">{project.impact}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-text-muted leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/20 dark:border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <FaGithub className="text-xl" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for project image */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
