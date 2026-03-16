import {
  FaCode,
  FaExternalLinkAlt,
  FaFire,
  FaGithub,
  FaSyncAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

import GithubStats from "./GithubStats";

const ProblemSolving = () => {
  const codolioUsername = import.meta.env.VITE_CODOLIO_USERNAME || "bnyashwanth";
  const codolioProfileUrl = `https://codolio.com/profile/${codolioUsername}`;
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || "bnyashwanth";
  const githubProfileUrl = `https://github.com/${githubUsername}`;
  const dailyRefreshKey = new Date().toISOString().slice(0, 10);

  return (
    <section
      id="problem-solving"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            {/* Problem Solving &{" "} */}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
             Problem Solving & DSA 
            </span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            DSA stats from Codolio and GitHub activity directly from GitHub.
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
                Data Source
              </h3>
            </div>
            <p className="text-2xl font-bold text-purple-400">Codolio + GitHub</p>
            <p className="text-text-muted text-sm mt-1">
              DSA + development activity
            </p>
          </div>

          {/* Daily Refresh */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaSyncAlt className="text-pink-400 text-xl" />
              <h3 className="text-lg font-semibold text-text-primary">
                Daily Refresh
              </h3>
            </div>
            <p className="text-2xl font-bold text-pink-400">Enabled</p>
            <p className="text-text-muted text-sm mt-1">
              Cache key: {dailyRefreshKey}
            </p>
          </div>

          {/* Profile Handle */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-yellow-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Codolio Handle
            </h3>
            <p className="text-yellow-400 text-lg font-semibold">{codolioUsername}</p>
            <p className="text-text-muted text-sm mt-1">From .env or fallback value</p>
          </div>

          {/* Consistency */}
          <div
            className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaFire className="text-orange-400 text-xl" />
              <h3 className="text-lg font-semibold text-text-primary">
                GitHub Handle
              </h3>
            </div>
            <p className="text-orange-400 text-lg font-semibold">{githubUsername}</p>
            <p className="text-text-muted text-sm mt-1">For contribution heatmap and repo stats</p>
          </div>
        </div>

        {/* Codolio Live Embed */}
        <div className="mt-10" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-3 sm:p-4 shadow-md dark:shadow-none hover:shadow-lg hover:border-purple-500/50 transition-all duration-300">
            <iframe
              src={`${codolioProfileUrl}?refresh=${dailyRefreshKey}`}
              title="Codolio Activity"
              className="w-full h-[560px] rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white"
              loading="lazy"
            />
          </div>
          <p className="text-text-muted text-sm mt-3 text-center">
            If your browser blocks embeds, use the profile link below to view the
            latest daily changes.
          </p>
          <div className="mt-6 text-center">
            {/* ── Codolio CTA ── */}
            <motion.a
              href={codolioProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.09, y: -7, boxShadow: "0 22px 48px rgba(168,85,247,0.28)" }}
              whileTap={{ scale: 0.96 }}
                className="relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/40 overflow-visible"
            >
              {/* Outer slow-pulse ring */}
              <motion.span
                aria-hidden="true"
                className="absolute -inset-2 rounded-full border border-purple-400/25 pointer-events-none"
                animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.07, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner fast-pulse ring */}
              <motion.span
                aria-hidden="true"
                className="absolute -inset-0.5 rounded-full border border-pink-400/35 pointer-events-none"
                animate={{ scale: [1, 1.10, 1], opacity: [0.55, 0.12, 0.55] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Shimmer sweep */}
              <motion.span
                aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                initial={{ x: "-110%" }}
                animate={{ x: ["-110%", "110%"] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
              />
              {/* Glow blob – left */}
              <motion.span
                aria-hidden="true"
                className="absolute -left-5 -top-3 w-14 h-14 rounded-full blur-2xl bg-purple-500/25 pointer-events-none"
                animate={{ x: [-4, 0, -6, -4], y: [0, -3, 1, 0] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Glow blob – right */}
              <motion.span
                aria-hidden="true"
                className="absolute -right-5 -bottom-3 w-14 h-14 rounded-full blur-2xl bg-pink-500/20 pointer-events-none"
                animate={{ x: [4, 0, 6, 4], y: [0, 3, -1, 0] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
              />
              {/* Orbiting dot – top-right */}
              <motion.span
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 pointer-events-none"
                animate={{ scale: [1, 1.5, 1], opacity: [0.9, 0.3, 0.9], x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Orbiting dot – bottom-left */}
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1.5 -left-1.5 w-2 h-2 rounded-full bg-pink-400 pointer-events-none"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8], x: [0, -4, 0], y: [0, 4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              {/* Label + animated icon */}
              <span className="relative z-10 flex items-center gap-2">
                View Codolio Profile
                <motion.span
                  className="inline-flex items-center"
                  whileHover={{ rotate: 20, scale: 1.25 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <FaExternalLinkAlt className="text-sm" />
                </motion.span>
              </span>
            </motion.a>
          </div>
        </div>
        <GithubStats username={githubUsername} />

        <div className="mt-8 text-center">
          {/* ── GitHub CTA ── */}
          <motion.a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            whileHover={{ scale: 1.09, y: -7, boxShadow: "0 22px 48px rgba(236,72,153,0.32)" }}
            whileTap={{ scale: 0.96 }}
            className="relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/40 overflow-visible"
          >
            {/* Outer slow-pulse ring */}
            <motion.span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full border border-pink-400/30 pointer-events-none"
              animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.08, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
            {/* Inner fast-pulse ring */}
            <motion.span
              aria-hidden="true"
              className="absolute -inset-0.5 rounded-full border border-purple-300/40 pointer-events-none"
              animate={{ scale: [1, 1.10, 1], opacity: [0.6, 0.12, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            {/* Shimmer sweep */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              initial={{ x: "-110%" }}
              animate={{ x: ["-110%", "110%"] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "linear", repeatDelay: 1.4, delay: 0.6 }}
            />
            {/* Glow blob – left */}
            <motion.span
              aria-hidden="true"
              className="absolute -left-5 -top-3 w-14 h-14 rounded-full blur-2xl bg-purple-600/30 pointer-events-none"
              animate={{ x: [-4, 0, -6, -4], y: [0, -3, 1, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
            {/* Glow blob – right */}
            <motion.span
              aria-hidden="true"
              className="absolute -right-5 -bottom-3 w-14 h-14 rounded-full blur-2xl bg-pink-600/25 pointer-events-none"
              animate={{ x: [4, 0, 6, 4], y: [0, 3, -1, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
            />
            {/* Orbiting dot – top-right */}
            <motion.span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-pink-300 pointer-events-none"
              animate={{ scale: [1, 1.5, 1], opacity: [0.9, 0.3, 0.9], x: [0, 5, 0], y: [0, -5, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
            {/* Orbiting dot – bottom-left */}
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-1.5 -left-1.5 w-2 h-2 rounded-full bg-purple-300 pointer-events-none"
              animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8], x: [0, -4, 0], y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
            />
            {/* Label + animated icon */}
            <span className="relative z-10 flex items-center gap-2">
              <FaGithub className="text-base" />
              View GitHub Profile
              <motion.span
                className="inline-flex items-center"
                whileHover={{ rotate: 20, scale: 1.25 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                <FaExternalLinkAlt className="text-sm" />
              </motion.span>
            </span>
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolving;
