"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

interface FAQItemProps {
  question: string;
  children: ReactNode;
}

function FAQItem({ question, children }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className={`rounded-xl border bg-surface transition-all duration-300 ${
        open ? "border-primary/50" : "border-border"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="no-scale-hover flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors hover:text-primary"
      >
        {question}
        <FiArrowRight
          className={`h-4 w-4 shrink-0 text-text-muted transition-all duration-300 ${
            open ? "rotate-90 text-primary" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef}>
          <div className="border-t border-border px-5 pb-4 pt-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQProps {
  items: { question: string; answer: ReactNode }[];
  className?: string;
}

export default function FAQ({ items, className = "" }: FAQProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <FAQItem key={i} question={item.question}>
          {item.answer}
        </FAQItem>
      ))}
    </div>
  );
}
