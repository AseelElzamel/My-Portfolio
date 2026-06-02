import { Trait, Passion, Project, Experience, Hobby } from './types';

export const USER_INFO = {
  fullName: "Aseel",
  pronouns: "she/her",
  title: "Software Developer & QA Tester",
  tagline: "Building video games and animation clips where art meets clean code!",
  avatar: "/src/assets/images/whimsical_avatar_casual_1780339203339.png",
  rocketImg: "/src/assets/images/whimsical_rocket_canvas_1780339220988.png",
  hobbiesImg: "/src/assets/images/whimsical_hobbies_1780322435482.png",
  bio: "I am a Software Developer passionate about crafting and testing interactive, and emotionally engaging Video Games and Simulators! I love working at the intersection of UI animations, vector simulations."
};

export const TRAITS: Trait[] = [
  {
    id: "Passion for Technology",
    name: "Passion for Technology",
    icon: "Palette",
    color: "from-emerald-400 to-teal-500",
    percentage: 90,
    description: "I obsess over creating animations, fast-paced video games, and responsive rhythm. I believe details make the perfect product!"
  },
  {
    id: "Beyond Technology",
    name: "Beyond Technology",
    icon: "nature",
    color: "from-sky-400 to-indigo-500",
    percentage: 85,
    description: "I love meeting new people, having lots of hobbies, connecting with nature, and baking cinnamon rolls from time to time! I genrally am a person who enjoys learning new things in all aspects of life!"
  },
  {
    id: "explorer",
    name: "Hobbies related to tech",
    icon: "Compass",
    color: "from-rose-400 to-amber-500",
    percentage: 99,
    description: "I am always learning, building, and exploring new things. I do lots of video games and soldering projects for fun!"
  }
];

export const PASSIONS: Passion[] = [
  {
    title: "Interactive UX Craft",
    icon: "MousePointerClick",
    bgHex: "#FEF08A", // yellow-200
    description: "Combining CSS-art, custom canvas contexts, and fluid modern spring animations to build things that feel completely tactile and alive."
  },
  {
    title: "Creative Audio & Synthesizers",
    icon: "Music",
    bgHex: "#BBF7D0", // green-200
    description: "Generating beautiful audio waveforms directly inside the browser using Web Audio API nodes. Play, experiment, and relax!"
  },
  {
    title: "Cooperative Learning",
    icon: "Users2",
    bgHex: "#FED7AA", // orange-200
    description: "Organizing coding workshops, recording tech explainers, and mentoring fellow students to foster an inclusive, vibrant web developer space."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "nebulacanvas",
    title: "Aurora Paint Pro",
    role: "Lead Creator & UI Engineer",
    period: "Spring 2026",
    description: "A highly creative browser drawing app where your cursor draws lines of glowing watercolor energy, complete with organic physics guides and audio synthesizer feedback.",
    tech: ["React", "HTML5 Canvas", "Web Audio API", "Tailwind CSS"],
    achievements: [
      "Custom procedural generation handles 10,000 active color nodes at 60 FPS.",
      "Embedded spatialized sound synthesis based on mouse speed and vertical grid coordinate.",
      "Highly interactive layout with modern butter-yellow dial controls."
    ],
    image: "canvas",
    category: "code"
  },
  {
    id: "orbitanalytics",
    title: "Bloom Team Workspace Dashboard",
    role: "Full-Stack Dev Intern",
    period: "Winter 2025",
    description: "A clean metrics control deck showing developer contribution counts, team project progress, and collaborative activity milestones.",
    tech: ["TypeScript", "Recharts", "Lucide Icons", "Express.js"],
    achievements: [
      "Designed dynamic team workspace view with micro-motion feedback.",
      "Maintained modular state, syncing visual elements elegantly.",
      "Optimized load times under 300ms using server-side caching."
    ],
    image: "dashboard",
    category: "design"
  },
  {
    id: "retroexplorer",
    title: "Watercolor Origami Land",
    role: "Sole Indie Developer",
    period: "Autumn 2024",
    description: "A fully responsive mini retro game experience with playful organic vectors, custom vector collision algorithms, and wind simulations.",
    tech: ["TypeScript", "HTML5 Canvas", "CSS Transitions", "Local Storage"],
    achievements: [
      "Crafted full mobile touch gameplay controls with dynamic wind glider handles.",
      "Over 1,200 unique origami designs compiled and persistently stored in local memory.",
      "Implemented beautiful procedural constellation connector."
    ],
    image: "game",
    category: "creative"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "creative-labs",
    company: "Studio Bloom Inc.",
    role: "Creative UI Engineering Intern",
    period: "June 2025 - Present",
    description: "Pioneered interactive landing experiences and spearheaded design system modules using modern Tailwind configurations.",
    skills: ["React", "Motion", "Tailwind CSS", "Semantic UI"],
    achievements: [
      "Designed and integrated over 30 fluid animations increasing user scroll engagement by 40%.",
      "Drafted standard typography hierarchy guides followed across three full-stack projects.",
      "Collaborated globally with 5 designers in Figma-to-code translations."
    ]
  },
  {
    id: "creative-hackathon",
    company: "University Hackathon",
    role: "Lead Interactive Designer",
    period: "February 2025",
    description: "Directed visual concept, layout design, and frontend interactivity for our grand-prize award winning web dashboard, 'EchoCanvas'.",
    skills: ["React", "Websockets", "Figma", "Creative Sound"],
    achievements: [
      "Designed an immersive collaborative canvas lobby connecting up to 100 synchronized users synchronously in 48 hours.",
      "Created cohesive retro-playful visuals with soft warm pastel tones and whimsical watercolor bubbles.",
      "Won the 'Most Memorable Interaction' and 'Grand Prize' from over 85 engineering entries."
    ]
  }
];

export const HOBBIES: Hobby[] = [
  {
    id: "synth",
    title: "Sound Wave Sandbox",
    icon: "Music",
    description: "I design digital synthesizer wave-pads! Play around with the mouse to trigger real-time playful audio chime sounds.",
    interactLabel: "Launch Synthesizer",
    bgGrad: "from-amber-100 to-amber-200 text-amber-900 border-amber-300"
  },
  {
    id: "stargaze",
    title: "Connect-the-Dots Game",
    icon: "Compass",
    description: "Command our whimsical vector flyer rocket! steer through floating watercolor bubbles to light up hand-drawn glowing lines.",
    interactLabel: "Start Arcade",
    bgGrad: "from-green-100 to-green-200 text-green-900 border-green-300"
  },
  {
    id: "travel",
    title: "Memory Polaroid Album",
    icon: "Camera",
    description: "Flipping through captured moments of team picnics, traveling, art museum trips, and delicious snacks.",
    interactLabel: "Open Memories",
    bgGrad: "from-orange-100 to-orange-200 text-orange-900 border-orange-300"
  }
];
