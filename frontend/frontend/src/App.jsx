import React from 'react';
// src/App.jsx - CORRECTED VERSION
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Education from './components/Education.jsx';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <Projects />
      <Skills />
      <Education /> 
      <Contact />
    </div>
  );
}

export default App;