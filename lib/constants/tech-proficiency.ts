export const TECH_PROFICIENCY: Record<string, number> = {
  "Next.js": 3,
  NestJS: 4,
  Angular: 3,
  PostgreSQL: 3,
  MongoDB: 3,
  Redis: 2,
  Apache: 2,
  Nginx: 2,
  TypeScript: 4,
  "Tailwind CSS": 4,
  Sass: 3,
  CSS3: 4,
  HTML5: 4,
  PHP: 2,
  N8N: 2,
  JavaScript: 4,
  React: 3,
  Docker: 2,
  "Node.js": 3,
  Express: 3,
  Git: 4,
};

export function getProficiencyLevel(name: string): number {
  return TECH_PROFICIENCY[name] ?? 1;
}
