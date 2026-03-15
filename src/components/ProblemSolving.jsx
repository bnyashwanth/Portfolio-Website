import { FaCode, FaExternalLinkAlt, FaFire, FaSyncAlt } from "react-icons/fa";

const ProblemSolving = () => {
  const codolioUsername = import.meta.env.VITE_CODOLIO_USERNAME || "bnyashwanth";
  const codolioProfileUrl = `https://codolio.com/profile/${codolioUsername}`;
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
            Problem Solving &{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              DSA
            </span>
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            Live coding activity powered by Codolio. This section auto-refreshes
            daily so your latest progress is visible on the portfolio.
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
            <p className="text-2xl font-bold text-purple-400">Codolio</p>
            <p className="text-text-muted text-sm mt-1">
              Aggregated coding profile
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
              Profile Handle
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
                Consistency
              </h3>
            </div>
            <p className="text-text-muted text-sm">
              Live activity stream
            </p>
            <p className="text-text-muted text-sm mt-1">
              Synced from Codolio profile
            </p>
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
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={codolioProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/40"
          >
            View Codolio Profile
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolving;
