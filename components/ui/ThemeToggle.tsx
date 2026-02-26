"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        setTheme(stored);
        document.documentElement.dataset.theme = stored;
        return;
      }

      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.dataset.theme = initial;
    } catch (e) {
      // ignore in SSR contexts
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className="relative inline-flex items-center p-1 rounded-full transition-all shadow-sm bg-white/60 backdrop-blur-sm border border-white/40 hover:scale-105"
    >
      <span className={`w-8 h-4 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-700' : 'bg-yellow-200'}`} />
      <div className={`absolute left-0 top-0 bottom-0 m-0.5 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4 shadow-sm' : 'translate-x-0 shadow-sm'}`}>
        {theme === "dark" ? <Sun className="w-4 h-4 text-yellow-400 m-1" /> : <Moon className="w-4 h-4 text-blue-500 m-1" />}
      </div>
    </button>
  );
}
