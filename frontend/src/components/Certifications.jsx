// frontend/src/components/Certifications.jsx
import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const certificationData = [
  { _id: 1, name: "Full-Stack Web Developer", authority: "Apna College" },
  { _id: 2, name: "Data Structures and Algorithmns", authority: "Apna College" },
  { _id: 3, name: "Data Science", authority: "Udemy" },
];

const Certifications = () => {
  return (
    <section>
      <h2>Certifications & Courses</h2>
      <div className="glass-card">
        <ul className="certifications-list">
          {certificationData.map(cert => (
            <li key={cert._id}>
              <FaCertificate className="cert-icon" />
              <span><strong>{cert.name}</strong> - {cert.authority}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certifications;