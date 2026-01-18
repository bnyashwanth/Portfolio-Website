
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1e1e24] dark:bg-white text-white dark:text-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-700 data-[theme=light]:border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'var(--card-background)',
                        color: 'var(--font-color-primary)',
                        border: '1px solid var(--glass-border)'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-10"
                    >
                        <FaTimes />
                    </button>

                    {/* Image */}
                    <div className="w-full h-64 overflow-hidden rounded-t-xl">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.stack?.map((tech, index) => (
                                <span key={index} className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-300 dark:text-gray-600 mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Links */}
                        <div className="flex gap-4 pt-4 border-t border-gray-700/50">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                                    <FaGithub /> GitHub
                                </a>
                            )}
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            )}
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
