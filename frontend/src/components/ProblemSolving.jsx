import { FaCode, FaExternalLinkAlt, FaTrophy, FaFire } from "react-icons/fa";

const ProblemSolving = () => {
  return (
    <section
      id="problem-solving"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Problem Solving &{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              DSA
            </span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            Strong foundation in Data Structures & Algorithms with consistent
            practice on LeetCode and competitive programming.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Problems Solved */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="0"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaCode className="text-purple-400 text-xl" />
              <h3 className="text-lg font-semibold text-text-primary">
                Problems Solved
              </h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">202+</p>
            <p className="text-text-muted text-sm mt-1">
              Easy • Medium • Hard
            </p>
          </div>

          {/* Contest Rating */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaTrophy className="text-pink-400 text-xl" />
              <h3 className="text-lg font-semibold text-text-primary">
                Contest Rating
              </h3>
            </div>
            <p className="text-3xl font-bold text-pink-400">1628</p>
            <p className="text-text-muted text-sm mt-1">
              Top 19.7% globally
            </p>
          </div>

          {/* Difficulty Split */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-yellow-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Difficulty Split
            </h3>
            <ul className="text-text-muted space-y-1 text-sm">
              <li>Easy: <span className="text-green-500">119+</span></li>
              <li>Medium: <span className="text-yellow-500">71+</span></li>
              <li>Hard: <span className="text-red-500">12+</span></li>
            </ul>
          </div>

          {/* Streak / Consistency */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaFire className="text-orange-400 text-xl" />
              <h3 className="text-lg font-semibold text-text-primary">
                Consistency
              </h3>
            </div>
            <p className="text-text-muted text-sm">
              100 Days Badge (2025)
            </p>
            <p className="text-text-muted text-sm mt-1">
              Max streak: 19 days
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://leetcode.com/u/BN_Yashwanth/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/40"
          >
            View LeetCode Profile
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolving;
