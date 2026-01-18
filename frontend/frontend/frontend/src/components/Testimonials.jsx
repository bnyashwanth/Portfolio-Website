
import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Dr. Sarah Mitchell",
        role: "Professor, Robotics Dept.",
        text: "Yashwanth showed exceptional understanding of autonomous systems during his project. His ability to integrate complex algorithms with practical hardware implementation is impressive."
    },
    {
        id: 2,
        name: "Rahul Verma",
        role: "Senior Developer, TechCorp",
        text: "Collaborating with Yashwanth on the hackathon project was a breeze. He writes clean, meaningful code and has a knack for solving backend scalability issues."
    },
    {
        id: 3,
        name: "Project Client",
        role: "Freelance",
        text: "He delivered the website exactly as I envisioned, but with better performance optimizations than I expected. Highly recommended for full-stack work."
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <SectionWrapper id="testimonials" className="max-w-4xl mx-auto">
            <h2 className="mb-12">What People Say</h2>

            <div className="relative">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="glass-card p-10 text-center relative"
                    >
                        <FaQuoteLeft className="text-4xl text-blue-500/20 absolute top-6 left-6" />
                        <p className="text-lg md:text-xl italic text-gray-300 mb-6 relative z-10">
                            "{testimonials[currentIndex].text}"
                        </p>
                        <div>
                            <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                            <span className="text-blue-400 text-sm">{testimonials[currentIndex].role}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={prev} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <FaChevronLeft />
                    </button>
                    <button onClick={next} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Testimonials;
