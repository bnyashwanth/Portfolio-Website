import { FaDownload } from "react-icons/fa";
import profileImage from "../assets/profile.png";
// import profileImageAlt from "../assets/profile1.png";
import useTypewriter from "../hooks/useTypewriter";

const Hero = () => {
  const typedText = useTypewriter([
    "B N Yashwanth",
    "Problem Solver",
  ]);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "B_N_Yashwanth_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleHireMe = () => {
    const contactSection = document.querySelector("#projects");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
    >


      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center min-w-0">

          {/* ================= LEFT : TEXT ================= */}
          <div
            className="relative text-center lg:text-left space-y-4 min-w-0"
            data-aos="fade-right"
          >
            {/* Soft glow behind text */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 blur-2xl dark:block hidden" />

            <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="block text-text-primary">
                Hello, I&apos;m

              </span>

              <span className="inline-flex w-fit max-w-none whitespace-nowrap
bg-gradient-to-r from-purple-500 to-pink-500
bg-clip-text text-transparent
">
                {typedText}
                <span className="ml-1 animate-caret text-purple-400">|</span>
              </span>
            </h1>

            <p className="relative text-base sm:text-lg md:text-xl font-medium text-primary">
              Software Engineering Intern @YugaYatra | Full-Stack Web Developer(MERN) | Exploring Agentic AI
            </p>

            <p className="relative text-text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I specialize in building scalable, real-world applications using the MERN stack,
              with a strong focus on backend systems and APIs. I actively explore AI-powered systems
              and Agentic AI concepts.
            </p>

            <div className="relative flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={handleHireMe}
                className="px-8 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-purple-500 to-pink-500
                hover:from-purple-600 hover:to-pink-600
                transition-all duration-300 transform hover:scale-105
                shadow-lg shadow-purple-500/40"
              >
                View Projects
              </button>

              <button
                onClick={handleDownloadResume}
                className="px-8 py-3 rounded-xl font-semibold
                bg-white dark:bg-surface
                border border-gray-300 dark:border-purple-500/30
                text-text-primary hover:border-purple-500
                hover:bg-purple-50 dark:hover:bg-gray-900/70
                transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaDownload />
                Download Resume
              </button>
            </div>
          </div>

          {/* ================= RIGHT : IMAGE ================= */}
          <div
            className="flex justify-center lg:justify-end pr-0 lg:pr-16 xl:pr-24 min-w-0"
            data-aos="fade-left"
          >
            <div className="relative animate-float">
              {/* Dark mode glow */}
              <div className="absolute inset-0 rounded-full
                bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500
                blur-3xl opacity-30 hidden dark:block" />

              {/* Frame */}
              <div className="relative rounded-full overflow-hidden
                border border-white/40 dark:border-gray-800/60
                bg-white/60 dark:bg-surface/50 p-3 shadow-2xl">
                <img
                  src={profileImage}
                  alt="B N Yashwanth"
                  className="
                    w-[260px] h-[260px]
                    sm:w-[300px] sm:h-[300px]
                    md:w-[340px] md:h-[340px]
                    lg:w-[380px] lg:h-[380px]
                    rounded-full object-cover
                  "
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
