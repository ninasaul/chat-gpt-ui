import { useEffect } from "react";
import { useGlobal } from "../context";
import { GlobalActionType, OptionActionType } from "../context/types";

export function useOptions() {
  const { options, setOptions } = useGlobal();
  const { size, theme } = options.general;
  useEffect(() => {
    const body = document.querySelector("html");
    //body.classList = [];
    body.setAttribute("data-theme", theme);
    body.setAttribute("data-size", size);
    body.classList.add(theme);
    body.classList.add(size);
  }, [theme, size]);

  const setAccount = (data = {}) => {
    setOptions({
      type: OptionActionType.ACCOUNT,
      data,
    });
  };

  const setGeneral = (data = {}) => {
    setOptions({
      type: OptionActionType.GENERAL,
      data,
    });
  };

  const setModel = (data = {}) => {
    setOptions({
      type: OptionActionType.OPENAI,
      data,
    });
  };

  return { setAccount, setModel, setGeneral };
}
