// frontend/src/App.jsx - UPDATED
import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx'; // Import
import WorkExperience from './components/WorkExperience.jsx'; // Import
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Certifications from './components/Certifications.jsx'; // Import
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx'; // Import

function App() {
  return (
    <div className="app-container">
      <Hero />
      <About id="about" />
      <WorkExperience />
      <Projects id="projects" />
      <Skills />
      <Education />
      <Certifications />
      
      <Footer />
    </div>
  );
}

export default App;