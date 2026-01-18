import React from 'react';

const ProjectCard = ({ project, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="bg-surface/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden cursor-pointer group hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] shadow-md dark:shadow-none hover:shadow-xl h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.imageUrl || "https://placehold.co/600x400/1a1a1a/purple?text=Project"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium px-4 py-2 rounded-full border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-purple-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm line-clamp-2 mb-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-text-muted border border-gray-200 dark:border-gray-700">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;