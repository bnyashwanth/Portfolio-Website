import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import WorkExperience from "./components/WorkExperience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { FaRobot } from "react-icons/fa";
import FloatingChatButton from "./components/FloatingChatButton.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import ChatContainer from "./components/ChatContainer";


function App() {
  return (
    <>
      <Navbar />

      <div className="app-container">

        
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <WorkExperience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
        
        <ChatWidget />
        


        
      </div>
    </>
  );
}

export default App;



