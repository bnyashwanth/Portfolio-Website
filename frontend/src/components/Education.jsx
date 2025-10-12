// frontend/src/components/Education.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUniversity } from 'react-icons/fa';


const Education = () => {
    const [educationList, setEducationList] = useState([]);

    useEffect(() => {
        
            axios.get(`${import.meta.env.VITE_API_URL}/education/`)
            .then(response => {
                setEducationList(response.data);
            })
            .catch(error => {
                console.log("Error fetching education data:", error);
            });
    }, []);

    if (educationList.length === 0) {
        return null; // Don't render the section if there's no data
    }

    return (
        <section>
            <h2>My Education</h2>
            <div className="glass-card">
                {educationList.map(edu => (
                    <div key={edu._id} className="education-entry">
                        <FaUniversity className="education-icon" />
                        <div>
                            <h3>{edu.degree}</h3>
                            <p className="institution">{edu.institution}</p>
                            <p className="year">{edu.year}</p>

                            {/* Conditionally render CGPA if it exists */}
                            {edu.cgpa && <p className="cgpa">CGPA: {edu.cgpa}</p>}
                            
                            {/* Conditionally render achievements if they exist */}
                            {edu.achievements && edu.achievements.length > 0 && (
                                <ul className="achievements-list">
                                    {edu.achievements.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;