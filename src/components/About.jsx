const About = () => {
  return (
    <section id="about" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

      <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200/50 dark:border-gray-800/50 space-y-6 shadow-md dark:shadow-none transition-all duration-300 hover:shadow-lg">
  <p className="text-text-muted text-base md:text-lg leading-relaxed">
    I'm Yashwanth, a <strong className="text-text-primary">Full-Stack Developer</strong> and undergraduate in 
    <strong className="text-text-primary"> Robotics and Artificial Intelligence</strong> at{" "}
    <strong className="text-text-primary">Dayananda Sagar College of Engineering</strong>. 
    I specialize in building scalable, real-world applications using the 
    <strong className="text-text-primary"> MERN stack</strong>, with a strong focus on backend systems, APIs, and performance-driven web applications.
  </p>

  <p className="text-text-muted text-base md:text-lg leading-relaxed">
    During my internships at <strong className="text-text-primary">YugaYatra</strong> and 
    <strong className="text-text-primary"> FreshIn10</strong>, I worked on developing production-ready systems 
    including an admin portal, KYC verification workflows, and core modules for a hyperlocal delivery platform. 
    These experiences strengthened my ability to design scalable architectures, build efficient APIs, 
    and collaborate on real-world products.
  </p>

  <p className="text-text-muted text-base md:text-lg leading-relaxed">
    Alongside full-stack development, I actively explore 
    <strong className="text-text-primary"> AI-powered systems</strong> by integrating 
    <strong className="text-text-primary"> Large Language Model (LLM) APIs</strong> into applications. 
    I enjoy experimenting with <strong className="text-text-primary">agentic AI</strong>, building intelligent 
    tools, and continuously improving my foundations in 
    <strong className="text-text-primary"> Data Structures</strong>, 
    <strong className="text-text-primary"> Algorithms</strong>, and 
    <strong className="text-text-primary"> Object-Oriented Programming</strong>.
  </p>
</div>
      </div>
    </section>
  );
};

export default About;
