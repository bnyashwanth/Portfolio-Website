import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { FaCodeBranch, FaExclamationCircle, FaGithub } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

const languageColors = {
	JavaScript: "#facc15",
	TypeScript: "#60a5fa",
	Python: "#34d399",
	Java: "#fb7185",
	C: "#22d3ee",
	"C++": "#38bdf8",
	Go: "#2dd4bf",
	HTML: "#fb923c",
	CSS: "#a78bfa",
	Shell: "#4ade80",
	default: "#c084fc",
};

const RAW_BASE_URL =
	import.meta.env.VITE_CHAT_API_BASE_URL ||
	(import.meta.env.DEV ? "http://localhost:5000" : "");
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");
const GITHUB_STATS_API_URL = `${BASE_URL}/api/github`;

const GithubStats = ({ username = "bnyashwanth" }) => {
	const [metrics, setMetrics] = useState({ prs: 0, issues: 0 });
	const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
	const [metricsError, setMetricsError] = useState("");
	const [topLanguages, setTopLanguages] = useState([]);
	const [isLoadingTopLanguages, setIsLoadingTopLanguages] = useState(true);
	const [topLanguagesError, setTopLanguagesError] = useState("");
	const [languageMeta, setLanguageMeta] = useState({
		totalRepositories: 0,
		totalLanguageTaggedRepositories: 0,
	});

	const { theme } = useTheme();
	const githubProfileUrl = `https://github.com/${username}`;
	const isDark = theme === "dark";
	const streakTheme = isDark ? "tokyonight" : "default";
	const topLanguage = topLanguages[0] || null;

	useEffect(() => {
		let isMounted = true;

		const fetchMetrics = async () => {
			setIsLoadingMetrics(true);
			setMetricsError("");

			try {
				const response = await fetch(
					`${GITHUB_STATS_API_URL}/metrics/${encodeURIComponent(username)}`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch GitHub metrics from server.");
				}

				const payload = await response.json();

				if (!isMounted) {
					return;
				}

				setMetrics({
					prs: payload?.metrics?.prs || 0,
					issues: payload?.metrics?.issues || 0,
				});
			} catch (error) {
				if (!isMounted) {
					return;
				}
				setMetricsError("Could not load PR/Issue metrics.");
			} finally {
				if (isMounted) {
					setIsLoadingMetrics(false);
				}
			}
		};

		fetchMetrics();

		return () => {
			isMounted = false;
		};
	}, [username]);

	useEffect(() => {
		let isMounted = true;

		const fetchTopLanguages = async () => {
			setIsLoadingTopLanguages(true);
			setTopLanguagesError("");

			try {
				const response = await fetch(
					`${GITHUB_STATS_API_URL}/top-languages/${encodeURIComponent(username)}`,
				);

				if (!response.ok) {
					throw new Error("Failed to fetch top languages from server.");
				}

				const payload = await response.json();

				if (!isMounted) {
					return;
				}

				setTopLanguages(payload?.topLanguages || []);
				setLanguageMeta(
					payload?.metadata || {
						totalRepositories: 0,
						totalLanguageTaggedRepositories: 0,
					},
				);
			} catch (error) {
				if (!isMounted) {
					return;
				}
				setTopLanguagesError("Could not load language stats.");
			} finally {
				if (isMounted) {
					setIsLoadingTopLanguages(false);
				}
			}
		};

		fetchTopLanguages();

		return () => {
			isMounted = false;
		};
	}, [username]);

	return (
		<div className="mt-12" data-aos="fade-up" data-aos-delay="150">
			<div className="text-center mb-8">
				<h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
					<span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
						GitHub Stats
					</span>
				</h3>
				<p className="mt-3 text-text-muted max-w-2xl mx-auto">
					Direct GitHub contribution heatmap for {username}.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div
					className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-5 shadow-md dark:shadow-none hover:shadow-lg hover:border-pink-500/50 transition-all duration-300"
					data-aos="zoom-in"
					data-aos-delay="100"
				>
					<h4 className="text-lg font-semibold text-text-primary mb-4">Streak</h4>
					<img
						src={`https://streak-stats.demolab.com?user=${username}&hide_border=true&theme=${streakTheme}`}
						alt={`${username} contribution streak`}
						loading="lazy"
						className="w-full rounded-xl"
					/>

					<div className="mt-4 border-t border-gray-200/50 dark:border-gray-800/50 pt-4">
						{isLoadingMetrics ? (
							<p className="text-text-muted text-sm">Loading PR/Issue metrics...</p>
						) : metricsError ? (
							<p className="text-red-400 text-sm">{metricsError}</p>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-text-primary">
								<div className="flex items-center justify-between bg-background/40 rounded-lg px-3 py-2 border border-gray-200/40 dark:border-gray-800/50">
									<div className="flex items-center gap-2">
										<FaCodeBranch className="text-green-400" />
										<span>Total PRs</span>
									</div>
									<span className="font-semibold">{metrics.prs}</span>
								</div>
								<div className="flex items-center justify-between bg-background/40 rounded-lg px-3 py-2 border border-gray-200/40 dark:border-gray-800/50">
									<div className="flex items-center gap-2">
										<FaExclamationCircle className="text-red-400" />
										<span>Total Issues</span>
									</div>
									<span className="font-semibold">{metrics.issues}</span>
								</div>
							</div>
						)}
					</div>
				</div>

				<div
					className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-5 sm:p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-pink-500/50 transition-all duration-300"
					data-aos="fade-up"
					data-aos-delay="120"
				>
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-semibold text-text-primary">Top Languages</h4>
						<span className="px-2.5 py-1 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-xs tracking-wide">
							Repo Mix
						</span>
					</div>

					{isLoadingTopLanguages ? (
						<div className="space-y-3 animate-pulse">
							<div className="h-14 rounded-xl bg-background/30" />
							<div className="h-2 rounded-full bg-background/40" />
							<div className="h-2 rounded-full bg-background/40" />
							<div className="h-2 rounded-full bg-background/40" />
						</div>
					) : topLanguagesError ? (
						<p className="text-red-400 text-sm">
							{topLanguagesError} View the profile on
							<a
								href={githubProfileUrl}
								className="ml-1 text-purple-400 underline"
								target="_blank"
								rel="noreferrer"
							>
								GitHub
							</a>
							.
						</p>
					) : topLanguages.length > 0 ? (
						<div className="space-y-4">
							{topLanguage ? (
								<div className="rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-pink-500/15 p-3">
									<p className="text-xs uppercase tracking-wider text-text-muted">
										Leading stack
									</p>
									<div className="mt-1 flex items-end justify-between gap-3">
										<div>
											<p className="text-xl font-bold text-text-primary">
												{topLanguage.name}
											</p>
											<p className="text-xs text-text-muted">
												{topLanguage.count} repositories
											</p>
										</div>
										<p className="text-2xl font-extrabold text-pink-300">
											{topLanguage.percentage}%
										</p>
									</div>
								</div>
							) : null}

							<div className="space-y-3">
								{topLanguages.map((language) => (
									<div key={language.name}>
										<div className="flex items-center justify-between text-sm text-text-primary mb-1">
											<span className="flex items-center gap-2">
												<span
													className="inline-block w-2.5 h-2.5 rounded-full"
													style={{
														backgroundColor:
															languageColors[language.name] || languageColors.default,
													}}
												/>
												{language.name}
											</span>
											<span className="text-text-muted">
												{language.percentage}% ({language.count})
											</span>
										</div>
										<div className="h-2 rounded-full bg-background/40 overflow-hidden">
											<div
												className="h-full transition-all duration-700 ease-out"
												style={{
													width: `${Math.max(language.percentage, 4)}%`,
													background: `linear-gradient(90deg, ${
														languageColors[language.name] || languageColors.default
													} 0%, #ec4899 100%)`,
												}}
											/>
										</div>
									</div>
								))}
							</div>

							<p className="text-xs text-text-muted pt-1 border-t border-gray-200/40 dark:border-gray-800/50">
								Based on {languageMeta.totalLanguageTaggedRepositories} public
								repositories with language tags ({languageMeta.totalRepositories}
								non-fork repos scanned).
							</p>
						</div>
					) : (
						<p className="text-text-muted text-sm">No public language data available.</p>
					)}
				</div>
			</div>

			<div
				className="bg-surface/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-5 sm:p-6 shadow-md dark:shadow-none hover:shadow-lg hover:border-purple-500/50 transition-all duration-300 overflow-x-auto"
				data-aos="fade-up"
				data-aos-delay="150"
			>
				<div className="flex items-center gap-3 mb-5">
					<FaGithub className="text-text-primary text-xl" />
					<h4 className="text-lg font-semibold text-text-primary">
						Contribution Heatmap
					</h4>
				</div>

				<div className="overflow-x-auto">
					<div className="min-w-[760px]">
						<GitHubCalendar
							username={username}
							colorScheme={isDark ? "dark" : "light"}
							blockSize={14}
							blockMargin={5}
							fontSize={14}
							theme={{
								light: ["#ebedf0", "#d8b4fe", "#c084fc", "#a855f7", "#db2777"],
								dark: ["#161b22", "#4c1d95", "#6d28d9", "#9333ea", "#ec4899"],
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GithubStats;
