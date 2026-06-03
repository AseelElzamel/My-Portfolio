import React, { useState } from 'react';
import { PROJECTS, EXPERIENCES } from '../data';
import { Project, Experience } from '../types';
import { ExternalLink, Github, Sparkles, Code2, Layers, Briefcase, Calendar, Star, Milestone } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ProjectsPageProps {
  isDark: boolean;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ isDark }) => {
  const [filter, setFilter] = useState<'all' | 'code' | 'design' | 'creative'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);


  // Mock mini metrics data for the Orbit Dashboard project preview
  const miniChartData = [
    { name: 'Mon', commits: 4 },
    { name: 'Tue', commits: 10 },
    { name: 'Wed', commits: 6 },
    { name: 'Thu', commits: 15 },
    { name: 'Fri', commits: 8 },
    { name: 'Sat', commits: 3 },
  ];

  return (
    <div id="projects-page" className="space-y-16 py-6 pb-20 animate-[fadeIn_0.5s_ease-out]">
      {/* HEADER SECTION & CATEGORY FILTER */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight mt-2">🛠️ Created Projects</h2>
          <p className="text-sm text-zinc-500 mt-1">Browse through my hands-on interactive projects</p>
        </div>

        {/* Filter station dials */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'code', 'design', 'creative'] as const).map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat}`}
              onClick={() => {
                setFilter(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans capitalize transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? isDark 
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' 
                    : 'bg-emerald-600 text-white font-extrabold shadow-md'
                  : isDark
                    ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-[#FCFAF2] border border-[#DFD9C3] text-slate-700 hover:bg-white'
              }`}
            >
              {cat === 'all' ? '🌟 All Projects' : cat === 'code' ? '💻 Software Projects' : cat === 'design' ? '👩🏻‍🔧 Hardware Projects' : '🎨 Experimental Projects'}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID SHOWCASE */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className={`flex flex-col justify-between rounded-3xl border-2 overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-zinc-100'
            }`}
          >
            {/* Visual Screen Preview Frame */}
            <div className={`relative h-44 w-full flex items-center justify-center border-b ${
              isDark ? 'bg-zinc-0 border-slate-800' : 'bg-[#FAF8F5] border-zinc-100'
            }`}>
              
              {/* Window controls (Mac style) */}
              <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="absolute top-2.5 right-3 text-[9px] font-mono opacity-50 tracking-wide">
                {project.id.toUpperCase()}
              </span>

              {/* LIVE MINI PREVIEW OF EACH PROJECT CONCEPT WITHOUT BROKEN JPG LINK SENSITURES */}
              <div className="absolute inset-x-4 top-10 bottom-4 rounded-xl overflow-hidden border dark:border-slate-800/80 bg-slate-900 flex items-center justify-center select-none text-white p-3">
                
                {project.image === 'canvas' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-grid opacity-[0.1]" />
                    <div className="z-10 text-center space-y-1.5">
                      <span className="animate-bounce block text-lg font-bold">🚴🏻</span>
                    </div>
                  </div>
                )}

                {project.image === 'dashboard' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-grid opacity-[0.1]" />
                    <div className="z-10 text-center space-y-1.5">
                      <span className="animate-bounce block text-lg font-bold">🔌</span>
                    </div>
                  </div>
                )}

                {project.image === 'game' && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-grid opacity-[0.1]" />
                    <div className="z-10 text-center space-y-1.5">
                      <span className="animate-bounce block text-lg font-bold">🚤</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{project.period}</span>
                  <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                    project.category === 'code' ? 'bg-sky-100 text-sky-800' : project.category === 'design' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-850'
                  }`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-sans group-hover:text-amber-500">{project.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal line-clamp-3">{project.description}</p>
              </div>

              {/* Achievements Highlight */}
              <div className="space-y-1.5 bg-zinc-50 dark:bg-slate-950 p-2.5 rounded-xl border dark:border-slate-800 text-[11px] text-zinc-600 dark:text-zinc-300">
                <span className="font-extrabold uppercase font-mono tracking-wider text-[8px] text-zinc-400 block">KEY MILESTONE:</span>
                <p className="leading-normal">{project.achievements[0]}</p>
              </div>

              {/* Tech Stack badgeline */}
              <div className="flex flex-wrap gap-1 pt-1">
                {project.tech.map((tool) => (
                  <span
                    key={tool}
                    className="text-[9px] font-mono bg-zinc-100 dark:bg-slate-800/80 hover:bg-amber-100 hover:text-amber-950 transition-colors text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-200/40 dark:border-zinc-700/60"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* INTERNSHIPS & WORK EXPERIENCE SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 text-amber-500" />
          <h2 className="text-2xl font-bold font-sans tracking-tight">🎒 Professional Work Experience</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className={`p-6 md:p-8 rounded-3xl border-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-white' : 'bg-[#FAF8F3]/60 border-[#DFD9C3] text-slate-800'
              }`}>
                
              {/* Corner badge element */}
              <div className="absolute top-0 right-0 h-12 w-12 bg-amber-200 dark:bg-slate-800 rotate-45 translate-x-6 -translate-y-6 opacity-30" />

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-zinc-300 dark:border-zinc-800 pb-3">
                  <div className="leading-tight">
                    <h3 className="text-lg font-bold font-sans text-amber-500">{exp.company}</h3>
                    <p className="text-xs font-semibold text-zinc-500">{exp.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/40 dark:bg-slate-900/50 py-1 px-2.5 rounded-full border dark:border-slate-800 border-zinc-300/60 font-medium whitespace-nowrap">
                    <Calendar className="h-3.5 w-3.5 opacity-70" /> {exp.period}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{exp.description}</p>
                
                {/* Specific bullets highlights */}
                <div className="space-y-2">
                  <div className="text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Key Achievements:</div>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-emerald-500 shrink-0 font-bold">✔</span>
                        <span className="leading-snug">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech toolkit utilized */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-sans font-medium bg-[#A7F3D0]/20 text-[#047857] hover:bg-[#A7F3D0]/40 transition duration-200 px-2.5 py-0.5 rounded-full border border-emerald-400/25"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM INTERACTION & CAMPUS CONSTELLATION POLAROID FOR PROJECTS */}
      {/* <section className="p-6 md:p-8 rounded-3xl border-4 border-dashed border-zinc-300/40 bg-zinc-50/20 dark:bg-zinc-900/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-bold font-sans flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" /> Collaboration & Tech Mentoring
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              I believe true developer maturity shines in cooperative settings. Over my academic runs, I have partnered with dozens of fellow student developers in intensive hackathons, coordinated agile pipelines as Scrum Lead, and volunteered design hours helping peer creators build highly responsive layouts.
            </p>
            <blockquote className="border-l-4 border-amber-300 pl-4 py-1 italic text-xs text-zinc-600 dark:text-zinc-400 leading-normal">
              "Aseel brings an absolute wave of playful enthusiasm. Not only did they complete our interactive paint renderer before the midnight lock, but they also recorded a complete screen tour explaining the math for our pitch deck."
              <cite className="block text-[10px] font-mono tracking-wide text-zinc-400 mt-1 uppercase font-bold">— Mock Hackathon Judge, EchoCanvas Review</cite>
            </blockquote>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            {/* Custom framed visual of collaboration memory */}
            {/* <div className="p-3 bg-white dark:bg-slate-950 border rounded-2xl shadow-xl w-full max-w-xs transform -rotate-1 hover:rotate-0 transition duration-300 space-y-3">
              <div className="w-full aspect-[4/3] bg-emerald-50/50 dark:bg-slate-900 rounded-lg flex flex-col items-center justify-center border border-dashed border-emerald-400/30 text-center p-4">
                <span className="text-2xl">🌱</span>
                <span className="text-[11px] font-bold mt-1.5 block">[ Hackathon Pitch memory ]</span>
                <span className="text-[9px] font-mono text-zinc-400 leading-tight block">Demonstrating interactive visual nodes live</span>
              </div>
              <div className="text-center pt-1 border-t border-dotted border-zinc-300">
                <span className="text-xs font-serif font-bold text-slate-800 dark:text-slate-100">"We Won Grand Master!"</span>
              </div>
            </div>
          </div>

        </div>
      </section> */}

    </div>
  );
};
