"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
}

const directionClasses: Record<RevealDirection, { hidden: string; visible: string }> = {
  up: { hidden: "translate-y-8 opacity-0", visible: "translate-y-0 opacity-100" },
  left: { hidden: "-translate-x-10 opacity-0", visible: "translate-x-0 opacity-100" },
  right: { hidden: "translate-x-10 opacity-0", visible: "translate-x-0 opacity-100" },
  scale: { hidden: "scale-90 opacity-0", visible: "scale-100 opacity-100" },
  none: { hidden: "opacity-0", visible: "opacity-100" },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { hidden, visible } = directionClasses[direction];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? visible : hidden} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
