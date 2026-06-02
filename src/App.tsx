import React, { useState } from 'react';
import { PageId } from './types';
import { USER_INFO } from './data';
import { ThemeToggle } from './components/ThemeToggle';
import { LandingPage } from './components/LandingPage';
import { ProjectsPage } from './components/ProjectsPage';
import { HobbiesPage } from './components/HobbiesPage';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('about');
  const [isDark, setIsDark] = useState<boolean>(false);

  const executeWarpTransitTo = (target: PageId) => {
    if (currentPage === target) return;
    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the currently selected page component
  const renderPageContent = () => {
    switch (currentPage) {
      case 'about':
        return <LandingPage isDark={isDark} />;
      case 'projects':
        return <ProjectsPage isDark={isDark} />;
      case 'hobbies':
        return <HobbiesPage isDark={isDark} />;
    }
  };

  // Sparse persistent starry background generator (twinkles randomly)
  const renderBackgroundStars = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(24)].map((_, index) => {
          const topPercent = (index * 13) % 95;
          const leftPercent = (index * 7) % 95;
          const isFast = index % 2 === 0;
          return (
            <div
              key={index}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              className={`absolute h-2 w-2 flex items-center justify-center opacity-40 ${
                isFast ? 'animate-twinkleFast' : 'animate-twinkleSlow'
              }`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-indigo-300' : 'bg-amber-400'}`} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className={`min-h-screen relative font-sans space-grid transition-colors duration-500 overflow-x-hidden ${
        isDark 
          ? 'bg-[#0B0F19]' 
          : 'bg-[#FAF7F2]'
      }`}
    >
      {/* Background Star field */}
      {renderBackgroundStars()}

      {/* 1. STICKY WEB HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-zinc-250/20 dark:border-slate-800/60 bg-white/70 dark:bg-[#0B0F19]/70 px-6 py-3.5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Whimsical Logo Identity */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center font-bold text-slate-900 border shadow-sm">
              🎈
            </div>
            <div className="leading-none">
              <span className="font-display font-extrabold text-base tracking-tight hover:text-amber-500 transition cursor-pointer">
                {USER_INFO.fullName}
              </span>
            </div>
          </div>

          {/* Traditional Inline Centered Top Navbar */}
          <nav className="flex items-center gap-1 bg-zinc-100/80 dark:bg-slate-900/80 p-1 rounded-xl border border-zinc-200/50 dark:border-slate-800/80 shadow-sm">
            <button
              onClick={() => executeWarpTransitTo('about')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentPage === 'about'? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm': 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-100'
              }`}
            >
              About
            </button>
            <button
              onClick={() => executeWarpTransitTo('projects')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentPage === 'projects'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-100'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => executeWarpTransitTo('hobbies')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentPage === 'hobbies'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-100'
              }`}
            >
              Hobbies and Interests
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {/* Premium Theme Switcher */}
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>
      </header>

      {/* 2. MAIN APPLICATION CONTENT PORTAL */}
      <main className="max-w-5xl mx-auto px-6 py-8 relative">
        <div className="scale-100 opacity-100 transition-all duration-200">
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
}
