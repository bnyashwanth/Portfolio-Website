import React from 'react';
import profilePic from '../assets/profile.png';

const Hero = () => {
  return (
     <div className="glass-card hero-card">
      {/* 2. Add the img tag here */}
      <img 
        src={profilePic} 
        alt="A photo of Your Name" 
        className="profile-picture" 
      />
      <h1>B N Yashwanth </h1>
      <p className="subtitle">MERN Stack Developer | AI Enginner | ML Enthusiast </p>
      <p>
        I build beautiful and reliable web applications. Currently focused on the MERN stack and exploring the world of Agentic AI. I'm passionate about clean code and great user experiences.
      </p>
    </div>
  );
};

export default Hero;