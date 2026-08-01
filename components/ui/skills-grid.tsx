"use client";

import Image from "next/image";
import Link from "next/link";

interface Skill {
  name: string;
  src: string;
  slug?: string;
}

interface SkillsGridProps {
  skills: Skill[];
  className?: string;
  linkPrefix?: string;
}

const COLUMN_SIZES = [3, 4, 3];

function distribute(skills: Skill[]): Skill[][] {
  const cols: Skill[][] = [[], [], []];
  let idx = 0;
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < COLUMN_SIZES[c] && idx < skills.length; i++, idx++) {
      cols[c].push(skills[idx]);
    }
  }
  while (idx < skills.length) {
    cols[2].push(skills[idx]);
    idx++;
  }
  return cols;
}

function SkillCard({
  skill,
  idx,
  linkPrefix,
}: {
  skill: Skill;
  idx: number;
  linkPrefix?: string;
}) {
  const card = (
    <div
      className="group flex w-22.5 flex-col items-center justify-center gap-1 rounded-xl border-2 border-transparent bg-surface px-1 py-2 animate-fade-in transition-all duration-300 hover:scale-105 hover:shadow-(--shadow-primary) sm:w-41.25 sm:gap-1.5 sm:px-3 sm:py-3"
      style={{
        backgroundImage:
          "linear-gradient(var(--color-surface), var(--color-surface)), radial-gradient(circle at top left, var(--color-primary), var(--color-accent))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        animationDelay: `${idx * 120}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="flex h-8 w-8 items-center justify-center sm:h-14 sm:w-14">
        <Image
          src={skill.src}
          alt={skill.name}
          width={40}
          height={40}
          className="h-6 w-6 transition-transform duration-200 group-hover:scale-110 sm:h-11 sm:w-11"
          unoptimized
        />
      </div>
      <span className="text-[7px] font-semibold uppercase tracking-wider text-text-muted transition-colors group-hover:text-text sm:text-xs">
        {skill.name}
      </span>
    </div>
  );

  if (linkPrefix && skill.slug) {
    return (
      <Link key={skill.slug} href={`${linkPrefix}/${skill.slug}`}>
        {card}
      </Link>
    );
  }

  return <div key={skill.name}>{card}</div>;
}

export default function SkillsGrid({
  skills,
  className = "",
  linkPrefix,
}: SkillsGridProps) {
  const cols = distribute(skills);
  let globalIdx = 0;

  return (
    <div
      className={`flex items-stretch justify-center gap-2 sm:gap-6 ${className}`}
    >
      {cols.map((col, colIdx) => {
        const isSide = colIdx !== 1;
        return (
          <div
            key={colIdx}
            className={`flex flex-col gap-2 sm:gap-6 ${isSide ? "justify-center" : ""}`}
          >
            {col.map((skill) => {
              const i = globalIdx++;
              return (
                <SkillCard
                  key={skill.slug ?? skill.name}
                  skill={skill}
                  idx={i}
                  linkPrefix={linkPrefix}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
