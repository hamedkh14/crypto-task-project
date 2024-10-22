'use client'

import { useEffect, useState } from "react";
import {FaMoon, FaSun} from 'react-icons/fa'

type Theme = "dark" | "light" | "system" | null;

export const DarkModeToggle = () => {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else if (localStorage.getItem("theme") === "light") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  }, []);

  function toggleDarkMode() {
    if (theme === "system") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (theme === "light") {
      setTheme("system");
      localStorage.removeItem("theme");
      applySystemTheme();
    }
  }

  function applySystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  
  return (
    <button onClick={toggleDarkMode} className="hover:text-primary transition-colors duration-300">{theme === 'dark' || theme === 'system' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}</button>
  )
}
