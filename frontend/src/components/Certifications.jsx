import React, { useState } from 'react';
import { FaCertificate } from 'react-icons/fa';

const certificationData = [
  { _id: 1, name: "Full-Stack Web Developer", authority: "Apna College", image: "/certificates/fullstack.png" },
  { _id: 2, name: "Data Structures and Algorithms", authority: "Apna College", image: "/certificates/dsa.jpg" },
 //  { _id: 3, name: "Data Science", authority: "Udemy", image: "/certificates/datascience.jpg" },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section>
      <h2>Certifications & Courses</h2>

      <div className="glass-card">
        <ul className="certifications-list">
          {certificationData.map(cert => (
            <li 
              key={cert._id} 
              className="cert-item"
              onClick={() => setSelectedCert(cert)}
            >
              <FaCertificate className="cert-icon" />
              <span><strong>{cert.name}</strong> - {cert.authority}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* MODAL */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{selectedCert.name}</h3>
            <img src={selectedCert.image} alt={selectedCert.name} />
            <button className="close-modal" onClick={() => setSelectedCert(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
