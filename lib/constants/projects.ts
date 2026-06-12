import { FiMessageCircle, FiBarChart2 } from "react-icons/fi";

export const PROJECTS = [
  {
    id: "umbrachat",
    icon: FiMessageCircle,
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/grecod28/umbrachat",
    liveUrl: "https://umbrachat.org",
    featured: true,
  },
  {
    id: "devmirror",
    icon: FiBarChart2,
    techStack: ["Next.js", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/grecod28/devmirror",
    featured: true,
  },
  {
    id: "devfolio",
    icon: FiBarChart2,
    techStack: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/grecod28/grecodev",
    liveUrl: "https://grecodev.vercel.app",
    featured: false,
  },
] as const;
