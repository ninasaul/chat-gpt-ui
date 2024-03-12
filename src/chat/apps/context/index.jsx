import React, { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";
import action from "./action";
import { initApps } from "./initState";

export const AppsContext = createContext(null);

export function AppsProvide({ children }) {
  const [state, dispatch] = useReducer(reducer, initApps);
  const actions = action(state, dispatch);
  return (
    <AppsContext.Provider value={{ ...state, ...actions, dispatch }}>
      {children}
    </AppsContext.Provider>
  );
}

export const useApps = () => useContext(AppsContext);
