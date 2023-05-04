import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme(initTheme) {
  const [themes, setThemes] = useState("light");
  const [theme, setTheme] = useLocalStorage("THEME", "light");
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    const body = document.querySelector("html");
    body.classList.remove("light", "dark");
    body.setAttribute("data-theme", theme);
    body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setThemes(theme);
  }, [theme]);

  return [themes, toggleTheme];
}
