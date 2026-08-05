export const TECH_PROFICIENCY: Record<string, number> = {
  "Next.js": 3,
  NestJS: 4,
  Angular: 3,
  PostgreSQL: 4,
  MongoDB: 3,
  Redis: 4,
  Apache: 2,
  Nginx: 2,
  TypeScript: 4,
  "Tailwind CSS": 4,
  Sass: 3,
  CSS3: 4,
  HTML5: 4,
  PHP: 3,
  N8N: 1,
  JavaScript: 4,
  React: 4,
  "React Native": 3,
  Docker: 2,
  "Node.js": 4,
  Express: 4,
  Git: 4,
  AWS: 3,
};

export function getProficiencyLevel(name: string): number {
  return TECH_PROFICIENCY[name] ?? 1;
}
