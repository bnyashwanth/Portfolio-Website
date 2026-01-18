import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ProblemSolving from "./components/ProblemSolving";
import Skills from './components/Skills';
import ChatWidget from './components/ChatWidget';
// import GithubStats from './components/GithubStats';
import BackgroundEffects from './components/BackgroundEffects';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
      offset: 50,
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-text-primary transition-colors duration-300">
      <BackgroundEffects />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />

      <ProblemSolving />
      {/* <GithubStats /> */}

      <Education />
      <Certifications />
      <Contact />
      <ChatWidget />
    </div>
  );
}

export default App;
