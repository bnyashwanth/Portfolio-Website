
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { FaMedium } from 'react-icons/fa';

const blogs = [
    {
        id: 1,
        title: "Understanding Agentic AI: The Future of Autonomous Systems",
        summary: "An introduction to Agentic AI, how it differs from traditional LLMs, and its potential to revolutionize workflows.",
        date: "Dec 20, 2024",
        link: "#",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Optimizing React Applications for Production",
        summary: "Key strategies for improving performance in React apps, from code splitting to efficient rendering patterns.",
        date: "Nov 15, 2024",
        link: "#",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Why Minimalist Design Works in Software Engineering",
        summary: "Exploring the principles of minimalism in UI/UX and how it leads to better user retention and cleaner code.",
        date: "Oct 05, 2024",
        link: "#",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=400&auto=format&fit=crop"
    }
];

const Blog = () => {
    return (
        <SectionWrapper id="blog">
            <h2>Technical Writings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div key={blog.id} className="glass-card p-0 overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                        <div className="h-48 overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <span className="text-sm text-blue-400 mb-2">{blog.date}</span>
                            <h3 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.summary}</p>
                            <a href={blog.link} className="mt-auto flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors">
                                Read on Medium <FaMedium />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Blog;
