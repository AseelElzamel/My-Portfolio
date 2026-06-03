import { Trait, Passion, Project, Experience, Hobby } from './types';
import avatarImg from './assets/images/whimsical_avatar_casual_1780339203339.png';
import hobbiesImg from './assets/images/whimsical_hobbies_1780322435482.png';

export const USER_INFO = {
  fullName: "Aseel",
  pronouns: "she/her",
  title: "Software Developer & QA Tester",
  tagline: "Building video games and animation clips where art meets clean code!",
  avatar: avatarImg,
  hobbiesImg: hobbiesImg,
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
    title: "Software Development Co-op",
    icon: "MousePointerClick",
    bgHex: "#FEF08A", // yellow-200
    description: "I did the software development co-op program at CNA, where I got to do 3 different work terms. I built many interactive websites, mobile games, and solved many real-world coding problems."
  },
  {
    title: "Electronics Systems Engineering Technology Co-op (ESET)",
    icon: "Music",
    bgHex: "#BBF7D0", // green-200
    description: "I did the electronics systems engineering technology co-op program at CNA, where I designed and built electronic circuits, soldered many projects including radios and Multimeters, and tested various hardware components."
  },
  {
    title: "Experimental Education",
    icon: "Users2",
    bgHex: "#FED7AA", // orange-200
    description: "I self-studied many programming languages to become a more versatile developer and be able to build and testthe video games and animation clips as I always aspired to."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "Capstone Project",
    title: "Bicycle NL",
    role: "Lead Creator & UI Engineer",
    period: "Winter 2026",
    description: "Designed and developed a custom website for a local cycling club, enabling members to register, manage memberships, and stay informed about upcoming events and club activities.",
    tech: ["HTML", "CSS", "JavaScript", "React", "Netlify", "Sanity.io"],
    achievements: [
      "Led the design and front-end development of a fully functional website in a collaborative team environment.",
      "Implemented membership registration and event information features to improve accessibility for club members.",
      "Presented the completed project to club members and stakeholders, showcasing the website's functionality and impact."
    ],
    image: "canvas",
    category: "code"
  },
  {
    id: "Electronics Assembly Project",
    title: "Digital Multimeter",
    role: "Assembler & Soldering Technician",
    period: "Winter 2023",
    description: "Assembled and soldered a functional digital multimeter from a component kit, applying electronic assembly techniques and attention to detail to ensure accurate operation.",
    tech: ["Soldering", "Electronics", "Circuit Testing"],
    achievements: [
      "Successfully soldered and assembled all electronic components onto a printed circuit board.",
      "Performed testing and troubleshooting to verify proper functionality and measurement accuracy.",
      "Developed hands-on experience with electronic circuits, component identification, and precision soldering techniques."
    ],
    image: "dashboard",
    category: "design"
  },
  {
    id: "Autonomous Surface vehicle",
    title: "Autonomous Surface Vessel",
    role: "Software Engineer",
    period: "2026 - Present",
    description: "Collaborating with a multidisciplinary team of engineering students to develop an autonomous surface vessel capable of navigating waterways independently. As part of the software team, I contribute to the development of navigation and obstacle-detection systems that enable the vessel to identify and avoid buoys while operating autonomously.",
    tech: ["Python", "Computer Vision", "Embedded Systems", "Autonomous Navigation", "Git"],
  achievements: [
    "Collaborate with mechanical, electrical, and software engineering students to design and develop an autonomous vessel.",
    "Contribute to software systems responsible for buoy detection, navigation, and obstacle avoidance.",
    "Support the integration and testing of autonomous features in real-world water environments.",
    "Apply problem-solving and teamwork skills within a large-scale interdisciplinary engineering project."
  ],
    image: "game",
    category: "creative"
  },
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
