import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section>
      <h2>Get In Touch</h2>
      <div className="glass-card contact-card">
        <p>I'm currently open to new opportunities. Feel free to reach out!</p>
        <a href="mailto:bnyashwanth2006@example.com" className="btn btn-gradient" style={{marginTop: '1rem'}}>
          <FaEnvelope /> Say Hello
        </a>
        <div className="social-links">
          <a href="https://github.com/bnyashwanth" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/bn-yashwanth/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;