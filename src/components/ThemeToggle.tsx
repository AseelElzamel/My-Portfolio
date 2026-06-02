import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, setIsDark }) => {
  return (
    <button
      id="theme-toggle"
      onClick={() => setIsDark(!isDark)}
      className={`relative inline-flex h-11 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
        isDark ? 'bg-indigo-950 border-indigo-500/30' : 'bg-amber-100 border-amber-300'
      }`}
      aria-label="Toggle visual palette mode"
    >
      <span
        className={`pointer-events-none relative inline-block h-9 w-9 transform rounded-full shadow-md transition duration-300 ease-in-out ${
          isDark 
            ? 'translate-x-[36px] bg-indigo-900 border border-purple-400/50' 
            : 'translate-x-0 bg-amber-400 border border-amber-200'
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-300 ${
            isDark ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
          }`}
        >
          <Sun className="h-4 w-4 text-amber-950 fill-amber-950/20" />
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-300 ${
            isDark ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
          }`}
        >
          <Moon className="h-4 w-4 text-purple-200 fill-purple-200/20" />
        </span>
      </span>
    </button>
  );
};
