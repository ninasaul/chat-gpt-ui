import { useEffect } from "react";
import { useGlobal } from "../context";

export function useOptions() {
  const { options, setOptions } = useGlobal();
  const { size, theme } = options.general;
  useEffect(() => {
    const body = document.querySelector("html");
    body.classList = [];
    body.setAttribute("data-theme", theme);
    body.setAttribute("data-size", size);
    body.classList.add(theme);
    body.classList.add(size);
  }, [theme, size]);

  const setAccount = (data = {}) => {
    setOptions({
      type: "account",
      data,
    });
  };

  const setGeneral = (data = {}) => {
    setOptions({
      type: "general",
      data,
    });
  };

  const setModel = (data = {}) => {
    setOptions({
      type: "openai",
      data,
    });
  };

  return { setAccount, setModel, setGeneral };
}
