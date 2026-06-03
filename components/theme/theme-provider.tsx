"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextValue {
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isLight: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle("light");
    const nowLight = document.documentElement.classList.contains("light");
    setIsLight(nowLight);
    localStorage.setItem("theme", nowLight ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
