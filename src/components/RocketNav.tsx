import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, Navigation, Globe } from 'lucide-react';
import { PageId } from '../types';
import { USER_INFO } from '../data';

interface RocketNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isLaunching: boolean;
  isDark: boolean;
}

// Simple synthesizer for audio feedback
const playBeep = (freq = 440, duration = 0.1, type: OscillatorType = 'sine') => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio Context might be blocked by user gesture restrictions, fails gracefully
  }
};

export const RocketNav: React.FC<RocketNavProps> = ({
  currentPage,
  onNavigate,
  isLaunching,
  isDark
}) => {
  const [hoveredDest, setHoveredDest] = useState<PageId | null>(null);
  const [thrusterActive, setThrusterActive] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(0);

  // Periodic tiny engine vibrations on hover
  useEffect(() => {
    let interval: any;
    if (thrusterActive) {
      interval = setInterval(() => {
        setShakeIntensity(Math.random() * 2 + 1);
      }, 50);
    } else {
      setShakeIntensity(0);
    }
    return () => clearInterval(interval);
  }, [thrusterActive]);

  const handleLaunchTo = (dest: PageId) => {
    if (currentPage === dest || isLaunching) return;
    
    // Play custom launch sweep frequencies
    playBeep(260, 0.1, 'sine');
    setTimeout(() => playBeep(390, 0.15, 'triangle'), 100);
    setTimeout(() => playBeep(520, 0.25, 'sawtooth'), 250);
    
    onNavigate(dest);
  };

  const getPageInfo = (id: PageId) => {
    switch (id) {
      case 'about':
        return { label: 'Creative Log', desc: 'About & Personality', num: '01' };
      case 'projects':
        return { label: 'Art Forge', desc: 'Work & Projects', num: '02' };
      case 'hobbies':
        return { label: 'Creative Sandbox', desc: 'Interests & Arcade', num: '03' };
    }
  };

  const pages: PageId[] = ['about', 'projects', 'hobbies'];

  return (
    <div id="rocket-dashboard" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      {/* Whimsical Cockpit UI Panel */}
      <div 
        style={{ transform: `translateY(${shakeIntensity}px) rotate(${shakeIntensity / 4}deg)` }}
        className={`w-full p-4 rounded-3xl shadow-2xl border-4 transition-all duration-300 backdrop-blur-md ${
          isDark 
            ? 'bg-slate-900/90 border-[#D4AF37]/45 text-white shadow-indigo-500/10' 
            : 'bg-[#FCFAF2]/95 border-[#E2DCC8] text-slate-800 shadow-amber-900/10'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Active Navigation Deck */}
          <div className="flex items-center gap-3">
            <div 
              onMouseEnter={() => setThrusterActive(true)}
              onMouseLeave={() => setThrusterActive(false)}
              onClick={() => {
                // Click rocket triggers next available slide
                const nextIndex = (pages.indexOf(currentPage) + 1) % pages.length;
                handleLaunchTo(pages[nextIndex]);
              }}
              title="Click to fly to the next page!"
              className={`p-3 rounded-full cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-slate-700' 
                  : 'bg-amber-100 hover:bg-amber-200 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-amber-200'
              }`}
            >
              {/* Background thruster flare */}
              {thrusterActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-amber-400/10 animate-pulse rounded-full" />
              )}
              <img 
                src={USER_INFO.rocketImg} 
                alt="Rocket" 
                referrerPolicy="no-referrer"
                className={`h-7 w-7 object-contain transition-transform duration-300 ${
                  thrusterActive ? 'scale-110 -translate-y-0.5' : ''
                }`}
              />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-[9px] text-white font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                🚀
              </span>
            </div>
            
            <div className="leading-tight">
              <div className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase flex items-center gap-1">
                <Globe className="h-3 w-3 animate-spin duration-[10s]" /> Current View
              </div>
              <div className="text-sm font-bold font-sans capitalize text-amber-500">
                {currentPage === 'about' ? '💫 Creative Deck' : currentPage === 'projects' ? '🛠️ The Art Forge' : '🎧 Playful Sandbox'}
              </div>
            </div>
          </div>

          {/* Nav Buttons (Planets) */}
          <div className="flex items-center gap-2 justify-between md:justify-end flex-grow">
            {pages.map((p) => {
              const info = getPageInfo(p);
              const isActive = currentPage === p;
              
              return (
                <button
                  key={p}
                  id={`nav-btn-${p}`}
                  onClick={() => handleLaunchTo(p)}
                  onMouseEnter={() => {
                    setHoveredDest(p);
                    playBeep(350, 0.05, 'triangle');
                  }}
                  onMouseLeave={() => setHoveredDest(null)}
                  className={`relative flex items-center justify-center flex-1 md:flex-initial py-2 px-3 rounded-2xl border text-xs font-bold font-sans transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? isDark 
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold scale-105' 
                        : 'bg-emerald-600 text-white border-emerald-500 shadow-md font-extrabold scale-105'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white'
                        : 'bg-[#EAE5D3]/60 text-slate-700 border-[#DFD9C3] hover:bg-amber-100 hover:text-amber-950'
                  }`}
                >
                  {/* Background flare on Hover */}
                  {!isActive && hoveredDest === p && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-yellow-500 animate-pulse" />
                  )}
                  
                  <span className="flex items-center gap-1.5 z-10">
                    <span className="text-[9px] font-mono opacity-60">#{info.num}</span>
                    <span className="hidden sm:inline">{p === 'about' ? 'About' : p === 'projects' ? 'Forge' : 'Sandbox'}</span>
                    <span className="sm:hidden capitalize">{p}</span>
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dashboard Status Line */}
        <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-dashed border-zinc-400/25 text-[10px] font-mono text-zinc-500/80">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLaunching ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLaunching ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span>{isLaunching ? 'SYSTEM: TRANSITION ACTIVE' : 'SYSTEM: STABLE STATE'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
            <span>Click Rocket above to fly to next slide</span>
          </div>
        </div>
      </div>
    </div>
  );
};
