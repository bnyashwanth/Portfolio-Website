import React from 'react';
import profilePic from '../assets/profile.png';

const Hero = () => {
  return (
    <section className="reveal">
     <div className="glass-card hero-card">
      {/* 2. Add the img tag here */}
      <img 
        src={profilePic} 
        alt="A photo of Your Name" 
        className="profile-picture" 
      />
      <h1>Hi, I'm   B N Yashwanth </h1>
      <h4 className="subtitle">Full-Stack Web Developer | Exploring Robotics  </h4>
      
    </div>
    </section>
  );
};

export default Hero;