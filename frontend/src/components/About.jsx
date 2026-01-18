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
            I'm Yashwanth, an <strong className="text-text-primary">Incoming Software Engineer Intern</strong> and a
            second-year undergraduate in <strong className="text-text-primary">Robotics and Artificial Intelligence</strong> at{' '}
            <strong className="text-text-primary">Dayananda Sagar College of Engineering</strong>. I specialize in
            building scalable, real-world applications using the <strong className="text-text-primary">MERN stack</strong>, with a strong focus on backend systems and APIs.
          </p>

          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            Alongside full-stack development, I actively explore{' '}
            <strong className="text-text-primary">AI-powered systems</strong> by integrating{' '}
            <strong className="text-text-primary">Large Language Model (LLM) APIs</strong> into production-ready
            applications. I have built and deployed a personal AI chatbot using{' '}
            <strong className="text-text-primary">Hugging Face</strong>, which introduced me to the foundations of{' '}
            <strong className="text-text-primary">Agentic AI</strong>—systems capable of task planning, tool usage, and
            contextual reasoning.
          </p>

          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            I continuously strengthen my fundamentals in <strong className="text-text-primary">Data Structures</strong>,{' '}
            <strong className="text-text-primary">Algorithms</strong>, and{' '}
            <strong className="text-text-primary">Object-Oriented Programming</strong>, while working on practical
            projects that bridge academic learning with real-world impact. I enjoy
            collaborating with engineers and building technology that solves meaningful
            problems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
