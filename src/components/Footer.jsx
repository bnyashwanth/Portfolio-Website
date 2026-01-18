const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-white/10 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-text-muted text-sm font-medium">
          © {new Date().getFullYear()} B N Yashwanth. Designed & Built with Love.
        </p>
      </div>
    </footer>
  );
};

export default Footer;