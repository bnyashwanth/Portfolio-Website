import { useState } from 'react';
import certificationsData from '../data/certificationsData';
import { FaCertificate } from 'react-icons/fa';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <section id="certifications" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert, index) => (
              <div
                key={cert.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => setSelectedCert(cert)}
                className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02] shadow-md dark:shadow-none hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <FaCertificate className="text-2xl text-purple-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-text-muted">{cert.authority}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-surface rounded-2xl max-w-4xl w-full p-6 border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-text-primary">{selectedCert.name}</h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-text-muted hover:text-text-primary text-2xl"
              >
                ×
              </button>
            </div>
            <img
              src={selectedCert.image}
              alt={selectedCert.name}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;
