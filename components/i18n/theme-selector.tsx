"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSelector() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Detecta estado inicial
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("light");

    const isNowLight = document.documentElement.classList.contains("light");
    setIsLight(isNowLight);
  };

  return (
    <button onClick={toggleTheme}>{isLight ? <FiMoon /> : <FiSun />}</button>
  );
}
