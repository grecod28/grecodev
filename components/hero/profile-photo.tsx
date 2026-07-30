"use client";

import Image from "next/image";
import { FiHelpCircle } from "react-icons/fi";

export default function ProfilePhoto() {
  return (
    <div className="group relative mx-auto h-35 w-35 cursor-pointer perspective-200">
      <div className="relative h-full w-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">
        {/* Front — question mark */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-surface ring-4 ring-primary/30 shadow-(--shadow-primary) backface-hidden">
          <div
            className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl animate-float"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-2 rounded-full bg-linear-to-r from-primary via-accent to-primary opacity-30 blur-xl animate-float"
            aria-hidden="true"
            style={{ animationDelay: "500ms" }}
          />
          <FiHelpCircle className="relative z-10 h-16 w-16 text-primary" />
        </div>
        {/* Back — photo */}
        <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)]">
          <Image
            src="/images/foto_perfil.png"
            alt="Santiago Greco"
            width={140}
            height={140}
            className="h-full w-full rounded-full object-cover ring-4 ring-primary/30 shadow-(--shadow-primary)"
            priority
          />
        </div>
      </div>
      {/* Photo indicator */}
      <div className="absolute -right-1 -top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-(--shadow-primary) transition-transform duration-300 group-hover:scale-0">
        <span className="text-xs font-bold text-white">ME</span>
      </div>
    </div>
  );
}
