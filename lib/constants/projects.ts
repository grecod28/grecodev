import {
  FiShoppingCart,
  FiCheckSquare,
  FiMessageCircle,
  FiEdit3,
  FiServer,
  FiBarChart2,
} from "react-icons/fi";

export const PROJECTS = [
  {
    id: "ecommerce",
    icon: FiShoppingCart,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/santiagogreco/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    id: "taskflow",
    icon: FiCheckSquare,
    techStack: ["Angular", "NestJS", "MongoDB", "Redis"],
    githubUrl: "https://github.com/santiagogreco/taskflow",
    liveUrl: undefined,
    featured: true,
  },
  {
    id: "chatify",
    icon: FiMessageCircle,
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/santiagogreco/chatify",
    liveUrl: "https://chatify-demo.vercel.app",
    featured: true,
  },
  {
    id: "devblog",
    icon: FiEdit3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    githubUrl: "https://github.com/santiagogreco/devblog",
    liveUrl: "https://devblog-demo.vercel.app",
    featured: false,
  },
  {
    id: "apihub",
    icon: FiServer,
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/santiagogreco/apihub",
    liveUrl: undefined,
    featured: false,
  },
  {
    id: "analytix",
    icon: FiBarChart2,
    techStack: ["Next.js", "NestJS", "MongoDB", "Docker"],
    githubUrl: "https://github.com/santiagogreco/analytix",
    liveUrl: "https://analytix-demo.vercel.app",
    featured: false,
  },
] as const;
