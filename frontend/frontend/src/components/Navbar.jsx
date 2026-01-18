import { useState, useEffect } from 'react';
import { FaCode, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-gray-800/50 shadow-sm dark:shadow-none'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="flex items-center gap-2 text-xl md:text-2xl font-bold group"
          >
            {/* Logo text */}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
              B&nbsp;N&nbsp;Yashwanth
            </span>
          </a>


          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-text-muted hover:text-primary transition-colors duration-200 relative group font-medium"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface text-text-primary hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary-purple" />}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface text-text-primary"
            >
              {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary-purple" />}
            </button>

            <button
              className="text-text-primary hover:text-primary transition-colors"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
