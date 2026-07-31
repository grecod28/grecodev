import { FiMessageCircle, FiBarChart2 } from "react-icons/fi";

export const PROJECTS = [
  {
    id: "umbrachat",
    icon: FiMessageCircle,
    techStack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Nginx",
      "TypeScript",
      "CSS3",
      "HTML5",
    ],
    githubUrl: "https://github.com/grecod28/umbrachat",
    liveUrl: "https://umbrachat.org",
    ImageSrc: "/images/projects/umbrachat.png",
    featured: true,
  },
  {
    id: "devmirror",
    icon: FiBarChart2,
    techStack: [
      "Next.js",
      "PostgreSQL",
      "Docker",
      "TypeScript",
      "HTML5",
      "CSS3",
    ],
    githubUrl: "https://github.com/grecod28/devmirror",
    liveUrl: undefined,
    ImageSrc: "",
    featured: true,
  },
  {
    id: "devfolio",
    icon: FiBarChart2,
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/grecod28/grecodev",
    liveUrl: "https://grecodev.vercel.app",
    ImageSrc: "",
    featured: false,
  },
] as const;
