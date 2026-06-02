import React, { useState, useEffect, useRef } from 'react';
import { HOBBIES, USER_INFO } from '../data';
import { Camera, Music, Compass, Star, Sparkles, Volume2, Gamepad2, Info } from 'lucide-react';

interface HobbiesPageProps {
  isDark: boolean;
}

export const HobbiesPage: React.FC<HobbiesPageProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<'synth' | 'arcade' | 'polaroid'>('synth');
  const [selectedVibe, setSelectedVibe] = useState<'ambient' | 'ripple' | 'chime'>('ambient');
  const [synthFrequency, setSynthFrequency] = useState<number>(440);
  const [starsCollected, setStarsCollected] = useState(0);
  const [gameResult, setGameResult] = useState<string>('');
  
  // Game refs and loop state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const spaceshipRef = useRef({ x: 150, y: 150, radius: 10, angle: -Math.PI / 2 });
  const starsRef = useRef<{ x: number; y: number; collected: boolean }[]>([]);

  // Sound Synthesizer Trigger function (sine wave synth)
  const playVibeTone = (hz: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = selectedVibe === 'ambient' ? 'sine' : selectedVibe === 'ripple' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(hz, audioCtx.currentTime);

      if (selectedVibe === 'ripple') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.connect(filter);
        filter.connect(gain);
      } else {
        osc.connect(gain);
      }

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (_) {}
  };

  const padFrequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C4 to C5 notes

  // Initialize Game stars once
  const initGame = () => {
    setStarsCollected(0);
    setGameResult('');
    spaceshipRef.current = { x: 150, y: 100, radius: 12, angle: -Math.PI / 2 };
    
    // Generate 5 random star coordinates inside 300x200 canvas bounds
    const generatedStars = [];
    for (let i = 0; i < 5; i++) {
      generatedStars.push({
        x: 40 + Math.random() * 220,
        y: 40 + Math.random() * 120,
        collected: false
      });
    }
    starsRef.current = generatedStars;
  };

  // Steer flyer relative to clicking navigation controls
  const steerShip = (direction: 'left' | 'right' | 'forward') => {
    const ship = spaceshipRef.current;
    if (direction === 'left') {
      ship.angle -= 0.3;
    } else if (direction === 'right') {
      ship.angle += 0.3;
    } else if (direction === 'forward') {
      // Thrust forwards in current heading direction
      ship.x += Math.cos(ship.angle) * 15;
      ship.y += Math.sin(ship.angle) * 15;
      
      // Boundary wraps
      if (ship.x < 0) ship.x = 280;
      if (ship.x > 300) ship.x = 20;
      if (ship.y < 0) ship.y = 180;
      if (ship.y > 200) ship.y = 20;

      playVibeTone(100 + Math.random() * 50);

      // Collision checks with active stars
      const updatedStars = [...starsRef.current];
      let collectedCount = 0;
      
      updatedStars.forEach((star) => {
        if (!star.collected) {
          const dist = Math.hypot(ship.x - star.x, ship.y - star.y);
          if (dist < 18) {
            star.collected = true;
            playVibeTone(600 + collectedCount * 100); // sound pitch goes up!
          }
        }
        if (star.collected) collectedCount++;
      });

      setStarsCollected(collectedCount);
      if (collectedCount === 5) {
        setGameResult('✨ Graphic Pattern Connected! Visual Artist rank achieved! ✨');
      }
    }
    drawGameFrame();
  };

  // Draw Game Canvas framework
  const drawGameFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#0f172a'; // space blue
    ctx.fillRect(0, 0, 300, 200);

    // Draw coordinate dots (Design Grid)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let c = 0; c < 300; c += 25) {
      ctx.beginPath();
      ctx.moveTo(c, 0);
      ctx.lineTo(c, 200);
      ctx.stroke();
    }

    // Connect collected stars with colorful line path vectors
    const collectedStars = starsRef.current.filter(s => s.collected);
    if (collectedStars.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b'; // golden design thread
      ctx.lineWidth = 2.5;
      ctx.moveTo(collectedStars[0].x, collectedStars[0].y);
      for (let s = 1; s < collectedStars.length; s++) {
        ctx.lineTo(collectedStars[s].x, collectedStars[s].y);
      }
      ctx.stroke();
    }

    // Draw Stars
    starsRef.current.forEach((star) => {
      if (star.collected) {
        // Draw golden collected emblem
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      } else {
        // Draw white active star
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw User Flyer (geometric origami vector)
    const ship = spaceshipRef.current;
    ctx.fillStyle = '#10b981'; // emerald green
    ctx.beginPath();
    // Head point
    ctx.moveTo(
      ship.x + Math.cos(ship.angle) * ship.radius,
      ship.y + Math.sin(ship.angle) * ship.radius
    );
    // Back left point
    ctx.lineTo(
      ship.x + Math.cos(ship.angle + 2.5) * ship.radius,
      ship.y + Math.sin(ship.angle + 2.5) * ship.radius
    );
    // Back right point
    ctx.lineTo(
      ship.x + Math.cos(ship.angle - 2.5) * ship.radius,
      ship.y + Math.sin(ship.angle - 2.5) * ship.radius
    );
    ctx.closePath();
    ctx.fill();
  };

  // Synchronize canvas drawing when tab loads
  useEffect(() => {
    if (activeTab === 'arcade') {
      initGame();
      setTimeout(drawGameFrame, 100);
    }
  }, [activeTab]);

  return (
    <div id="hobbies-page" className="space-y-16 py-6 pb-20 animate-[fadeIn_0.5s_ease-out]">
      
      {/* HEADER HERO SEGMENT WITH GENERATED HOBBIES GRAPHIC */}
      <section className="relative overflow-hidden rounded-3xl p-6 md:p-10 border-4 border-[#E2DCC8] bg-[#FCFAF2]/45 dark:bg-zinc-900/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase border ${
              isDark ? 'bg-amber-400/10 text-amber-300 border-amber-400/20' : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              <Camera className="h-3 w-3 text-amber-500" /> Playful interests cabin
            </span>
            <h2 className="text-3xl font-bold font-sans tracking-tight">🪐 Music, Travel & Sketched Patterns Sandbox</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              When I close my visual IDE, I explore completely different canvases. I am fascinated by digital modular synthesizer waveforms, retro physics arcade gameplay, vintage analog photography, and hiking into dense state parks to capture the silent natural mist on vintage analog sheets.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <img 
                src={USER_INFO.hobbiesImg} 
                alt="Creative hobbies" 
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-center">
                <span className="text-[10px] font-mono tracking-wider text-amber-300 font-bold uppercase">"Melodic Chords & Analog Gear"</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* COMPANION INTERACTIVE LAB CABIN TABS */}
      <section className="space-y-8">
        
        {/* Navigation Selector Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-slate-800 pb-2 overflow-x-auto gap-4">
          <button
            onClick={() => { setActiveTab('synth'); playVibeTone(300); }}
            className={`pb-3 text-sm font-bold font-sans border-b-2 flex items-center gap-2 px-1 cursor-pointer whitespace-nowrap transition duration-300 ${
              activeTab === 'synth' 
                ? 'border-amber-400 text-amber-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <Music className="h-4 w-4" /> Sound Wave Sandbox
          </button>
          
          <button
            onClick={() => { setActiveTab('arcade'); playVibeTone(380); }}
            className={`pb-3 text-sm font-bold font-sans border-b-2 flex items-center gap-2 px-1 cursor-pointer whitespace-nowrap transition duration-300 ${
              activeTab === 'arcade'
                ? 'border-amber-400 text-amber-500'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <Gamepad2 className="h-4 w-4" /> Pattern Connector Game
          </button>

          <button
            onClick={() => { setActiveTab('polaroid'); playVibeTone(440); }}
            className={`pb-3 text-sm font-bold font-sans border-b-2 flex items-center gap-2 px-1 cursor-pointer whitespace-nowrap transition duration-300 ${
              activeTab === 'polaroid'
                ? 'border-amber-400 text-amber-500'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            <Camera className="h-4 w-4" /> Creative Polaroid Gallery
          </button>
        </div>

        {/* Tab 1 Content: Synthesizer */}
        {activeTab === 'synth' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-[fadeIn_0.3s_ease-out]">
            
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-sans flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-amber-500 animate-bounce" /> Waveform Synth Machine
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Generate digital synthetic chime sounds live in the browser using HTML5 Web Audio components. Pick an organic soundwave preset below, and click individual pads to trigger playful frequencies.
                </p>
              </div>

              {/* Vibe presetter selectors */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block">Soundwave preset:</span>
                <div className="flex gap-2.5">
                  {(['ambient', 'ripple', 'chime'] as const).map((vibe) => (
                    <button
                      key={vibe}
                      onClick={() => {
                        setSelectedVibe(vibe);
                        playVibeTone(400);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans capitalize transition duration-200 cursor-pointer ${
                        selectedVibe === vibe
                          ? isDark ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-[#10b981] text-white font-extrabold'
                          : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-zinc-100 text-slate-700 hover:bg-zinc-200'
                      }`}
                    >
                      {vibe === 'ambient' ? '🌿 Soft Sine' : vibe === 'ripple' ? '🌊 Rough Saw' : '⚡ Pulse Tri'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status footer tag */}
              <div className="bg-zinc-50 dark:bg-slate-950/40 p-3.5 rounded-2xl border flex items-center gap-2.5 text-xs text-zinc-500">
                <Info className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Zero audio downloads needed - compiled mathematically via oscillator hardware frequencies.</span>
              </div>
            </div>

            {/* Synthesizer Interactive Pad Dashboard */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border-2 flex flex-col justify-between gap-6 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="text-center font-mono text-[9px] text-zinc-400 border-b pb-2 tracking-widest uppercase">
                CREATIVE_SCALE_OCTAVE_C4
              </div>

              {/* Keyboards visual grids */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {padFrequencies.map((freq, idx) => {
                  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSynthFrequency(freq);
                        playVibeTone(freq);
                      }}
                      className={`aspect-square sm:aspect-[2/3] rounded-2xl border-2 cursor-pointer flex flex-col justify-between p-3 transition duration-200 hover:-translate-y-1 active:scale-90 ${
                        synthFrequency === freq
                          ? isDark 
                            ? 'bg-amber-400 border-amber-300 text-slate-950 font-extrabold scale-102 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                            : 'bg-emerald-500 border-emerald-400 text-white font-extrabold scale-102 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isDark
                            ? 'bg-slate-900 border-slate-800 text-zinc-300 hover:bg-slate-800 hover:text-white'
                            : 'bg-[#FCFAF2] border-[#EAD09D]/40 text-slate-800 hover:bg-amber-50 hover:border-[#EAD09D]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-zinc-400 block">{notes[idx]}</span>
                      <span className="text-xs font-bold leading-none select-none">🔊</span>
                      <span className="text-[8px] font-mono text-zinc-500 block truncate">{Math.round(freq)}Hz</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic waveform visualizer loop indicator box */}
              <div className="h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around overflow-hidden relative p-1.5 shadow-inner">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/10 to-transparent w-16" />
                {/* 10 columns of moving wave heights */}
                {[...Array(16)].map((_, wIdx) => {
                  const activeHeight = synthFrequency > 0 ? (3 + (wIdx % 4) * (synthFrequency / 100)) % 100 : 10;
                  return (
                    <div 
                      key={wIdx}
                      style={{ height: `${synthFrequency ? activeHeight : 20}%` }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-amber-300 transition-all duration-300 animate-pulse"
                    />
                  );
                })}
                <div className="absolute right-3.5 text-[8px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950/80 px-2 rounded">
                  Active tone: {Math.round(synthFrequency)}Hz
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2 Content: Constellation game Arcade */}
        {activeTab === 'arcade' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-[fadeIn_0.3s_ease-out]">
            
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-sans flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-amber-500" /> Interactive Pattern Connector
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Command our whimsical flyer relative to localized canvas coordinates. Collect all 5 floating color dots to trace a sparkling graphic path. Click "Launch Flyer" to advance along the vector node lines.
                </p>
              </div>

              {/* Game statistics dashboard widget */}
              <div className="space-y-2 border-2 border-dashed border-zinc-200 dark:border-slate-800 p-4 rounded-2xl bg-zinc-50/50 dark:bg-slate-950/20">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
                  <span>Pattern Mission</span>
                  <span>Active Progress</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-dotted">
                  <span>Stars Collected:</span>
                  <span className="text-yellow-500 font-extrabold">{starsCollected} / 5</span>
                </div>
                {gameResult && (
                  <div className="text-xs text-yellow-500 font-sans font-extrabold leading-relaxed mt-2 p-2 bg-yellow-500/10 rounded-lg">
                    {gameResult}
                  </div>
                )}
                <button
                  onClick={() => {
                    initGame();
                    setTimeout(drawGameFrame, 50);
                    playVibeTone(500);
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold font-sans cursor-pointer transition ${
                    isDark ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  Restart Pattern Mission
                </button>
              </div>
            </div>

            {/* Game Canvas container viewport */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border-2 flex flex-col items-center justify-between gap-5 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-zinc-200'
            }`}>
              
              {/* HTML canvas viewport widget */}
              <div className="rounded-2xl overflow-hidden border-4 border-slate-800 shadow-xl bg-slate-950 flex justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={300} 
                  height={200}
                  className="block w-full max-w-xs aspect-[3/2]" 
                />
              </div>

              {/* Cockpit Vector Steer Command levers buttons */}
              <div className="flex items-center gap-3 justify-center w-full max-w-xs">
                <button
                  onClick={() => steerShip('left')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 font-bold font-mono text-white text-xs rounded-xl cursor-pointer shadow border border-slate-700"
                >
                  ◀ Rotate Left
                </button>
                <button
                  onClick={() => steerShip('forward')}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold font-sans text-xs rounded-xl cursor-pointer hover:shadow-lg hover:scale-105 transition"
                >
                  🚀 Launch Flyer
                </button>
                <button
                  onClick={() => steerShip('right')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 font-bold font-mono text-white text-xs rounded-xl cursor-pointer shadow border border-slate-700"
                >
                  Rotate Right ▶
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3 Content: Polaroids memories */}
        {activeTab === 'polaroid' && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold font-sans flex items-center gap-2">
                <Camera className="h-5 w-5 text-amber-500" /> Visual Creator Analog Polaroid Album
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Flip through travel memory logs, landscape snapshots, and outdoor paint projects.</p>
            </div>

            {/* Multi image cards responsive flexbox */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* Location Polaroid 1 */}
              <div className="p-4 bg-white dark:bg-slate-900 border rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between gap-4">
                <div className="w-full aspect-[4/3] bg-amber-50 dark:bg-slate-950 rounded border flex items-center justify-center p-4 text-center">
                  <div className="space-y-1 text-zinc-500">
                    <span className="text-2xl">🌲</span>
                    <h4 className="text-[11px] font-bold font-sans dark:text-zinc-300">[ Yosemite Ridge Hike ]</h4>
                    <span className="text-[9px] font-mono block">Scouting organic color values</span>
                  </div>
                </div>
                <div className="border-t pt-2.5 text-center font-handwriting font-sans">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-200">"Warm Pine & Green Canopy"</span>
                </div>
              </div>

              {/* Location Polaroid 2 */}
              <div className="p-4 bg-white dark:bg-slate-900 border rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between gap-4">
                <div className="w-full aspect-[4/3] bg-emerald-50 dark:bg-slate-950 rounded border flex items-center justify-center p-4 text-center">
                  <div className="space-y-1 text-zinc-500">
                    <span className="text-2xl">☕</span>
                    <h4 className="text-[11px] font-bold font-sans dark:text-zinc-300">[ Vintage Coffee Spot ]</h4>
                    <span className="text-[9px] font-mono block">Scouting retro design ideas</span>
                  </div>
                </div>
                <div className="border-t pt-2.5 text-center font-handwriting">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-200 font-sans">"Espresso & Art Zines"</span>
                </div>
              </div>

              {/* Location Polaroid 3 */}
              <div className="p-4 bg-white dark:bg-slate-900 border rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between gap-4">
                <div className="w-full aspect-[4/3] bg-indigo-50 dark:bg-slate-950 rounded border flex items-center justify-center p-4 text-center">
                  <div className="space-y-1 text-zinc-500">
                    <span className="text-2xl">🎻</span>
                    <h4 className="text-[11px] font-bold font-sans dark:text-zinc-300">[ Outdoor Folk Jam ]</h4>
                    <span className="text-[9px] font-mono block">Acoustic chimes loop session</span>
                  </div>
                </div>
                <div className="border-t pt-2.5 text-center font-handwriting">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-200 font-sans">"Acoustic chimes campfire"</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>

    </div>
  );
};
