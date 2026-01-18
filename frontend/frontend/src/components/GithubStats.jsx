
import React from 'react';
import * as GitHubCalendarPkg from 'react-github-calendar';
const GitHubCalendar = GitHubCalendarPkg.default || GitHubCalendarPkg;

import { useTheme } from '../context/ThemeContext';

const GithubStats = () => {
    const { theme } = useTheme();

    return (
        <section id="github-stats" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface/30">
            <div className="max-w-7xl mx-auto" data-aos="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Open Source Activity
                    </span>
                </h2>

                <div className="flex justify-center w-full">
                    <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-md dark:shadow-none hover:shadow-lg hover:border-purple-500/50 transition-all duration-300 w-full max-w-4xl flex justify-center overflow-x-auto">
                        <GitHubCalendar
                            username="bnyashwanth"
                            colorScheme={theme === 'dark' ? 'dark' : 'light'}
                            blockSize={16}
                            blockMargin={6}
                            fontSize={14}
                            theme={{
                                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            }}
                            renderBlock={(block, activity) =>
                                React.cloneElement(block, {
                                    title: `${activity.count} activities on ${activity.date}`,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
