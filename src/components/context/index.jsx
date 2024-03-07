import React, { createContext } from "react";

export const initState = {
  mode: "light",
  baseClass: "z",
};
export const UiContext = createContext(initState);

export const Provider = ({ children, ...rest }) => (
  <UiContext.Provider value={{ ...initState, ...rest }}>
    {children}
  </UiContext.Provider>
);
