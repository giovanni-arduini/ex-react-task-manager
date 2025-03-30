import React, { useEffect, useState } from "react";

function ThemeToggle() {
  // Check localStorage for the saved theme or default to light mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-300 dark:bg-gray-800 dark:text-white rounded-lg"
    >
      {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    </button>
  );
}

export default ThemeToggle;
