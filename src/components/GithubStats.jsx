import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
	FaCodeBranch,
	FaExclamationCircle,
	FaExternalLinkAlt,
	FaGithub,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

const GithubStats = ({ username = "bnyashwanth" }) => {
	const [metrics, setMetrics] = useState({
		prs: 0,
		issues: 0,
	});
	const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
	const [metricsError, setMetricsError] = useState("");

	const { theme } = useTheme();
	const githubProfileUrl = `https://github.com/${username}`;
	const isDark = theme === "dark";
	const statsTheme = isDark ? "tokyonight" : "default";
	const streakTheme = isDark ? "tokyonight" : "default";

	useEffect(() => {
		let isMounted = true;

		const fetchMetrics = async () => {
			setIsLoadingMetrics(true);
			setMetricsError("");

			try {
				const commonHeaders = {
					Accept: "application/vnd.github+json",
				};

				const [prsRes, issuesRes] = await Promise.all([
					fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`, {
						headers: commonHeaders,
					}),
					fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`, {
						headers: commonHeaders,
					}),
				]);

				if (!prsRes.ok || !issuesRes.ok) {
					throw new Error("Failed to fetch GitHub metrics.");
				}

				const [prs, issues] = await Promise.all([prsRes.json(), issuesRes.json()]);

				if (!isMounted) {
					return;
				}

				setMetrics({
					prs: prs?.total_count || 0,
					issues: issues?.total_count || 0,
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

	return (
		<div className="mt-12" data-aos="fade-up" data-aos-delay="150">
			<div className="text-center mb-8">
				<h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
					{/* GitHub{" "} */}
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
					<h4 className="text-lg font-semibold text-text-primary mb-4">Top Languages</h4>
					<img
						src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&langs_count=8&theme=${statsTheme}`}
						alt={`${username} top languages`}
						loading="lazy"
						className="w-full rounded-xl"
					/>
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

				{/* Profile link moved to parent component for consistent placement */}
			</div>
		</div>
	);
};

export default GithubStats;
