import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        // Lock body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!project) return null;

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className="relative bg-surface dark:bg-[#111827] text-text-primary rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10 backdrop-blur-md"
                    >
                        <FaTimes />
                    </button>

                    {/* Image Header */}
                    <div className="relative w-full h-64 sm:h-80">
                        <img
                            src={project.imageUrl || "https://placehold.co/800x400/1a1a1a/purple?text=Project"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 space-y-8">
                        {/* Description */}
                        <div>
                            <p className="text-lg text-text-muted leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Problem, Approach, Impact Grid */}
                        {(project.problem || project.approach || project.impact) && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {project.problem && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-purple-500 uppercase tracking-wider">Problem</h3>
                                        <p className="text-sm text-text-muted leading-relaxed">{project.problem}</p>
                                    </div>
                                )}
                                {project.approach && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">Approach</h3>
                                        <p className="text-sm text-text-muted leading-relaxed">{project.approach}</p>
                                    </div>
                                )}
                                {project.impact && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-green-500 uppercase tracking-wider">Impact</h3>
                                        <p className="text-sm text-text-muted leading-relaxed">{project.impact}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Links Footer */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-primary font-medium transition-all"
                                >
                                    <FaGithub className="text-xl" />
                                    <span>View Source</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/25"
                                >
                                    <FaExternalLinkAlt />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectModal;
