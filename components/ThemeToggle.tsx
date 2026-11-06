"use client";

import { useEffect, useState } from "react";

type Theme = "night" | "day";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const initial: Theme = saved === "night" ? "night" : "day";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "night" ? "day" : "night"} theme`}
      aria-pressed={theme === "day"}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "night" ? "☼" : "☾"}
      </span>
      <span>{theme === "night" ? "Day" : "Night"}</span>
    </button>
  );
}
