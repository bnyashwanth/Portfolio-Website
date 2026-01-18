
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Default to 'dark' immediately to prevent flash
    // Only use localStorage if it was explicitly set, otherwise default to dark
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("portfolio-theme");
        return saved ? saved : "dark";
    });

    useEffect(() => {
        localStorage.setItem("portfolio-theme", theme);
        // This ensures the attribute is present on the HTML tag
        document.documentElement.setAttribute("data-theme", theme);

        // Also toggle the class for Tailwind's 'selector' strategy if needed, 
        // though we are using data-theme selector in config.
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
