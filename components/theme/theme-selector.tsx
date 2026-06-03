"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/theme/theme-provider";

export default function ThemeSelector() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{isLight ? <FiMoon /> : <FiSun />}</button>
  );
}
