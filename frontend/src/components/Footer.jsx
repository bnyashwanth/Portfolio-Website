// frontend/src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <p> Get in Touch </p>
          
        </div>
        <div className="social-icons">
          <a href="https://github.com/bnyashwanth" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/bn-yashwanth/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="mailto:bnyashwanth2006@gmail.com"><FaEnvelope /></a>
        </div>
        <p className="copyright-note">
          © 2025 B N Yashwanth. Designed & Built with Love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;