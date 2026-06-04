import React, { useState } from 'react';
import { TRAITS, PASSIONS, USER_INFO } from '../data';
import { Sparkles, Heart, Star, Send, ArrowRight, UserCheck, Terminal, Award } from 'lucide-react';
import { Trait } from '../types';


interface LandingPageProps {
  isDark: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isDark }) => {
  const [selectedTrait, setSelectedTrait] = useState<Trait | null>(TRAITS[0]);
  const [showFunFact, setShowFunFact] = useState<number | null>(null);

  const funFacts = [
    { emoji: "👩🏻‍🔧", title: "Soldering", text: "My passion for soldering grew during ESET. I enjoy working hands-on with electronics, and I never pass up an opportunity to build, repair, or prototype something new!"},
    { emoji: "🎮", title: "Video Gaming", text: "I enjoy exploring new games and keeping up with industry trends. Gaming often inspires ideas for projects and helps me think about technology from a user's perspective."},
    { emoji: "🧁", title: "Baking", text: "When I'm away from my computer, you'll often find me baking. It's a creative and relaxing way to recharge."},
    { emoji: "🏃🏻‍♀️", title: "Running", text: "I never considered myself a runner until I joined a local running group. Now, I enjoy the challenge and the energy boost that comes with every run."},
    { emoji: "🥾", title: "Hiking", text: "Hiking is one of my favorite ways to disconnect, clear my mind, and enjoy the outdoors."},
    { emoji: "🎸", title: "Playing Guitar", text: "I'm a self-taught guitarist, and playing music has become one of my favorite creative outlets."},
    { emoji: "🌱", title: "Planting", text: "My interest in gardening started with a single avocado seed and has since grown into a rewarding hobby!"},
    { emoji: "🐝", title: "Learning a new Hobby", text: "I love trying new things and challenging myself to learn new skills. There's always another hobby waiting to spark my curiosity :)"}

  ];

  return (
    <div id="landing-page" className="space-y-16 py-6 pb-20 animate-[fadeIn_0.5s_ease-out]">
      {/* 1. HERO INTRODUCTION */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 border-4 border-dashed border-amber-300/40 bg-zinc-50/20 dark:bg-zinc-900/10 backdrop-blur-sm">
        {/* Floating background blobs/stars */}
        <div className="absolute top-10 right-10 animate-[bounce_6s_infinite_ease-in-out]">
          <Star className="h-10 w-10 text-yellow-400 fill-yellow-300 opacity-60" />
        </div>
        <div className="absolute bottom-10 left-10 animate-[pulse_4s_infinite_ease-in-out]">
          <Sparkles className="h-8 w-8 text-emerald-400 opacity-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight leading-tight">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-emerald-500 to-orange-500 dark:from-amber-400 dark:via-emerald-400">{USER_INFO.fullName}</span>!
            </h1>

            <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300">
              {USER_INFO.title}
            </p>

            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300/95' : 'text-slate-700'}`}>
              {USER_INFO.bio}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#traits"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold font-sans text-sm shadow-md transition-all duration-300 ${
                  isDark? 'bg-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95': 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                }`}
              >More about me!
                <ArrowRight className="h-4 w-4" />
              </a>


            </div>
          </div>

          {/* Hero Right Avatar Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group p-4">
              {/* Spinning whimsical canvas orbit ring */}
              <div className="absolute inset-0 border-2 border-dashed border-zinc-400/30 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-2 border border-dotted border-amber-400/40 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              

              {/* Main Avatar Bubble */}
              <div className="relative z-0 h-64 w-64 md:h-72 md:w-72 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-xl bg-gradient-to-b from-amber-100 to-emerald-50">
                <img 
                  src={USER_INFO.avatar} 
                  alt={USER_INFO.fullName} 
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PERSONALITY TRAITS (Interactive Card Segment) */}
      <section id="traits" className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold font-sans tracking-tight">
            ⚡ Traits and Quirks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Traits Selector Column */}
          <div className="md:col-span-5 space-y-3">
            {TRAITS.map((trait) => (
              <button
                key={trait.id}
                id={`trait-btn-${trait.id}`}
                onClick={() => {
                  setSelectedTrait(trait);
                  const aud = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const osc = aud.createOscillator();
                  const gain = aud.createGain();
                  osc.frequency.setValueAtTime(400 + Math.random() * 200, aud.currentTime);
                  gain.gain.setValueAtTime(0.08, aud.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.01, aud.currentTime + 0.08);
                  osc.connect(gain);
                  gain.connect(aud.destination);
                  osc.start();
                  osc.stop(aud.currentTime + 0.08);
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group ${
                  selectedTrait?.id === trait.id
                    ? isDark 
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md translate-x-2' 
                      : 'bg-emerald-50 border-emerald-500 text-emerald-950 translate-x-2 shadow-sm'
                    : isDark
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300'
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border font-bold capitalize text-sm ${
                    selectedTrait?.id === trait.id 
                      ? isDark ? 'bg-amber-300/30 text-amber-950' : 'bg-emerald-200/50 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 border-zinc-200 dark:border-zinc-700'
                  }`}>
                    {trait.id === 'optimist' ? '😃' : trait.id === 'designer' ? '🎨' : trait.id === 'storyteller' ? '📖' : '🧭'}
                  </div>
                  <div className="font-bold text-sm tracking-tight">{trait.name}</div>
                </div>
                
                <span className="text-xs font-mono opacity-80 group-hover:translate-x-1 duration-200 transition-transform">
                ➔
                </span>
              </button>
            ))}
          </div>

          {/* Feature Showcase Detail Card */}
          <div className="md:col-span-7">
            {selectedTrait && (
              <div className={`p-6 md:p-8 rounded-3xl border-4 border-double h-full flex flex-col justify-between transition-all duration-500 ${isDark ? 'bg-slate-900/90 border-slate-800 shadow-xl text-white' : 'bg-white border-zinc-200 text-slate-800 shadow-xl'}`}>
                <div className="space-y-4">
                  {/* Gauge bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase">
                      <span>{selectedTrait.name}</span>
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    <h3 className="text-2xl font-bold font-sans text-amber-500 dark:text-amber-400">
                      {selectedTrait.name}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {selectedTrait.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. PASSIONS, GOALS & FUN CONSTELLATION SEGMENT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Passions Segment */}
        <div className={`p-6 md:p-8 rounded-3xl border-2 shadow-sm space-y-6 ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-zinc-200/80'
        }`}>
          <div>
            <h3 className="text-2xl font-bold font-sans">🌿 Education</h3>
          </div>

          <div className="space-y-4">
            {PASSIONS.map((passion, index) => {
              const bgVal = passion.bgHex;
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl flex gap-4 border transition-all duration-300 hover:scale-[1.02] ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-zinc-50 border-zinc-100'
                  }`}
                >
                  <div 
                    style={{ backgroundColor: isDark ? '#111827' : bgVal }}
                    className="p-3 rounded-xl flex items-center justify-center shrink-0 border dark:border-slate-800 font-bold"
                  >
                    <span className="text-lg">
                      {index === 0 ? '👩🏻‍💻' : index === 1 ? '👩🏻‍🔧' : '📚'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-sans">{passion.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{passion.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fun Quirks Segment */}
        <div className={`p-6 md:p-8 rounded-3xl border-2 shadow-sm space-y-6 flex flex-col justify-between ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-[#FAF7F2] border-zinc-200/80'
        }`}>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-sans">🍿 Things you'll find me doing on my free time</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-grow my-4">
            {funFacts.map((fact, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setShowFunFact(showFunFact === idx ? null : idx);
                }}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden group select-none ${
                  showFunFact === idx
                    ? isDark ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.03]' : 'bg-amber-100 border-amber-300 scale-[1.03]'
                    : isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between text-lg z-10">
                  <span>{fact.emoji}</span>
                </div>
                <div className="pt-2 z-10">
                  <h4 className="text-xs font-extrabold font-sans leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400">
                    {fact.title}
                  </h4>
                  {showFunFact === idx && (
                    <p className="text-[11px] font-medium leading-normal mt-1.5 duration-300 ease-out font-sans">
                      {fact.text}
                    </p>
                  )}
                  {showFunFact !== idx && (
                    <span className="text-[9px] font-mono block opacity-55 mt-1">Click log...</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-zinc-500/80 text-center flex items-center justify-center gap-1.5 border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-3">
          </div>
        </div>

      </section>

      {/* 4. VISUALLY IMMERSIVE RETRO FRAMES FOR MEMORIES / TEAM WORKSHOPS */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold font-sans">📸 Polaroids from previous Tech Events</h2>
          <p className="text-xs text-zinc-500 mt-1">A collection of moments captured at conferences, hackathons, workshops, and networking events throughout my tech journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Polaroid 1: Team Photo Frame */}
          <div className="p-4 bg-white dark:bg-slate-900 border-2 border-zinc-200/80 dark:border-slate-800 rounded-lg shadow-md transform hover:rotate-2 hover:scale-[1.02] transition-all duration-300 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded border-2 border-zinc-100 bg-emerald-50/40 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
              {/* Abstract layout resembling visual team placeholder */}
              <div className="absolute inset-4 rounded border border-dashed border-emerald-400/30 flex flex-col items-center justify-center text-center p-4">
                <span className="text-3xl filter saturate-50 animate-pulse">👥</span>
                <span className="text-xs font-bold font-sans mt-2 dark:text-zinc-300">[ Hackathon team pic ]</span>
              </div>
            </div>
            <div className="pt-2 text-center border-t border-dashed border-zinc-300/40">
              <h4 className="font-handwriting text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">"Hackathon 2025"</h4>
              <p className="text-[10px] font-mono text-emerald-600 mt-1">16 hours of code & laughs</p>
            </div>
          </div>

          {/* Polaroid 2: Workshop / Event Photo */}
          <div className="p-4 bg-white dark:bg-slate-900 border-2 border-zinc-200/80 dark:border-slate-800 rounded-lg shadow-md transform hover:-rotate-1 hover:scale-[1.02] transition-all duration-300 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded border-2 border-zinc-100 bg-amber-50/40 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-4 rounded border border-dashed border-amber-400/30 flex flex-col items-center justify-center text-center p-4">
                <span className="text-3xl filter saturate-50 animate-bounce">🎙️</span>
                <span className="text-xs font-bold font-sans mt-2 dark:text-zinc-300">[ Iceberge ASV ]</span>
              </div>
            </div>
            <div className="pt-2 text-center border-t border-dashed border-zinc-300/40">
              <h4 className="font-handwriting text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">"Boat testing"</h4>
              <p className="text-[10px] font-mono text-amber-600 mt-1">10 Months of prgramming and Testing the oat</p>
            </div>
          </div>

          {/* Polaroid 3: Solo Workspace / Creation */}
          <div className="p-4 bg-white dark:bg-slate-900 border-2 border-zinc-200/80 dark:border-slate-800 rounded-lg shadow-md transform hover:rotate-1 hover:scale-[1.02] transition-all duration-300 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded border-2 border-zinc-100 bg-sky-50/40 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-4 rounded border border-dashed border-sky-400/30 flex flex-col items-center justify-center text-center p-4">
                <span className="text-3xl filter saturate-50 animate-spin duration-3000">🏡</span>
                <span className="text-xs font-bold font-sans mt-2 dark:text-zinc-300">[ Soldering workshop ]</span>              
              </div>
            </div>
            <div className="pt-2 text-center border-t border-dashed border-zinc-300/40">
              <h4 className="font-handwriting text-base font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">"Soldering Projects"</h4>
              <p className="text-[10px] font-mono text-sky-600 mt-1">Months of soldering and building electronic projects</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
