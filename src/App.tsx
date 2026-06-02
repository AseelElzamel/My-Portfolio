import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { USER_INFO } from './data';
import { ThemeToggle } from './components/ThemeToggle';
import { RocketNav } from './components/RocketNav';
import { LandingPage } from './components/LandingPage';
import { ProjectsPage } from './components/ProjectsPage';
import { HobbiesPage } from './components/HobbiesPage';
import { Star, Sparkles, Navigation2, Compass, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('about');
  const [nextPage, setNextPage] = useState<PageId | null>(null);
  
  // Warp states: 'stable' | 'ignition' | 'warpspeed' | 'decelerating'
  const [warpStatus, setWarpStatus] = useState<'stable' | 'ignition' | 'warpspeed' | 'decelerating'>('stable');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Sound generator for rocket thrusters sweep
  const playThrusterSweep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Node oscillators for a deep rumble & high sweep
      const rumbleOsc = audioCtx.createOscillator();
      const sweepOsc = audioCtx.createOscillator();
      const rumbleGain = audioCtx.createGain();
      const sweepGain = audioCtx.createGain();
      
      rumbleOsc.type = 'sawtooth';
      rumbleOsc.frequency.setValueAtTime(60, audioCtx.currentTime);
      rumbleOsc.frequency.linearRampToValueAtTime(180, audioCtx.currentTime + 1.2);
      
      sweepOsc.type = 'sine';
      sweepOsc.frequency.setValueAtTime(200, audioCtx.currentTime);
      sweepOsc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.8);
      
      rumbleGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      
      sweepGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      sweepGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      
      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(audioCtx.destination);
      
      sweepOsc.connect(sweepGain);
      sweepGain.connect(audioCtx.destination);
      
      rumbleOsc.start();
      sweepOsc.start();
      
      rumbleOsc.stop(audioCtx.currentTime + 1.2);
      sweepOsc.stop(audioCtx.currentTime + 1.2);
    } catch (_) {}
  };

  const executeWarpTransitTo = (target: PageId) => {
    if (currentPage === target || warpStatus !== 'stable') return;

    setNextPage(target);
    setWarpStatus('ignition');
    playThrusterSweep();

    // Schedule Hyperdrive Tunnel after 500ms of ignition shake
    setTimeout(() => {
      setWarpStatus('warpspeed');
      
      // Core content swap happens deep inside the warp tunnel
      setTimeout(() => {
        setCurrentPage(target);
        setWarpStatus('decelerating');
        
        // Decelerate and restore stability
        setTimeout(() => {
          setWarpStatus('stable');
          setNextPage(null);
          // Scroll up so the visitor starts from the top of the next coordinate page
          window.scrollTo({ top: 0, behavior: 'instant' as any });
        }, 600);
      }, 700);
    }, 500);
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
          ? 'bg-[#0B0F19] text-slate-100 dark' 
          : 'bg-[#FAF7F2] text-slate-800 light'
      }`}
    >
      {/* Background Star field */}
      {renderBackgroundStars()}

      {/* 1. STICKY WEB HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-zinc-200/40 dark:border-slate-800/60 bg-white/60 dark:bg-[#0B0F19]/60 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* Whimsical Logo Identity */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center font-bold text-slate-900 border shadow-sm">
              🎈
            </div>
            <div className="leading-none">
              <span className="font-display font-extrabold text-base tracking-tight hover:text-amber-500 transition cursor-pointer">
                {USER_INFO.fullName}
              </span>
              <span className="text-[9px] font-mono block text-zinc-500">Portfolio Studio v3</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Active status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono uppercase border border-emerald-500/20 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Status: Active
            </div>

            {/* Premium Theme Switcher */}
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </div>
        </div>
      </header>

      {/* 2. MAIN APPLICATION CONTENT PORTAL */}
      <main className="max-w-5xl mx-auto px-6 py-8 relative">
        <div 
          className={`transition-all duration-300 ${
            warpStatus === 'ignition' ? 'rumible-active scale-98 filter blur-[1px]' :
            warpStatus === 'warpspeed' ? 'scale-90 opacity-0 filter blur-lg' :
            warpStatus === 'decelerating' ? 'scale-102 opacity-50 filter blur-[2px]' : 
            'scale-100 opacity-100'
          }`}
        >
          {renderPageContent()}
        </div>
      </main>

      {/* 3. CINEMATIC HYPERDRIVE WARP TRANSITION SCREEN CURTAIN */}
      {warpStatus !== 'stable' && (
        <div className="fixed inset-0 z-50 bg-[#070B14] flex flex-col items-center justify-center text-white select-none transition-opacity duration-300">
          
          {/* Star Warp Line Vectors cutting downwards */}
          {warpStatus === 'warpspeed' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(40)].map((_, starIdx) => {
                const randX = Math.random() * 100;
                const randHeight = 40 + Math.random() * 120;
                const randDelay = Math.random() * 0.4;
                return (
                  <div
                    key={starIdx}
                    style={{
                      left: `${randX}%`,
                      height: `${randHeight}px`,
                      animationDelay: `${randDelay}s`,
                    }}
                    className="warp-star-trail"
                  />
                );
              })}
            </div>
          )}

          {/* Interactive central focus: Floating launching Rocket */}
          <div className="relative z-10 text-center space-y-6 max-w-sm px-6">
            <div className={`mx-auto h-32 w-32 relative ${
              warpStatus === 'warpspeed' ? 'animate-bounce' : ''
            }`}>
              <img 
                src={USER_INFO.rocketImg} 
                alt="Warping spaceship" 
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain transform -rotate-[45deg] scale-120 animate-pulse" 
              />
              {/* Propelling fire glows */}
              <div className="absolute -bottom-2 -left-2 h-10 w-10 bg-gradient-to-br from-orange-600 to-amber-300 rounded-full blur-sm animate-ping" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-display font-bold text-amber-400 uppercase tracking-widest animate-pulse">
                {warpStatus === 'ignition' && '🤖 Initializing Flyer Ignition...'}
                {warpStatus === 'warpspeed' && '✨ Flying with Watercolor Whimsy! ✨'}
                {warpStatus === 'decelerating' && '🎨 Landing to Next Canvas Slide...'}
              </h2>
              <div className="text-[10px] font-mono text-cyan-400 tracking-wider">
                TRANSITION SEQUENCE: {currentPage.toUpperCase()} ➔ {nextPage?.toUpperCase() || '?'}
              </div>
            </div>

            {/* Mock loading progression line */}
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden p-0.5 max-w-xs mx-auto">
              <div className={`h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400 rounded-full transition-all duration-1000 ${
                warpStatus === 'ignition' ? 'w-1/4' :
                warpStatus === 'warpspeed' ? 'w-3/4' : 'w-full'
              }`} />
            </div>
          </div>
        </div>
      )}

      {/* 4. THE COCKPIT PERSISTENT NAVIGATION UNIT */}
      <RocketNav 
        currentPage={currentPage} 
        onNavigate={executeWarpTransitTo} 
        isLaunching={warpStatus !== 'stable'}
        isDark={isDark} 
      />
    </div>
  );
}
