import React, {
  useRef,
  useEffect,
  useReducer,
  useContext,
  createContext,
  Dispatch
} from "react";
import action from "./action";
import reducer from "./reducer";
import { initState, GlobalState, GlobalActionType, GlobalAction } from "./initState";
import { fetchAndGetUser } from "../utils";

export const ChatContext = createContext(null);
export const MessagesContext = createContext<Dispatch<GlobalAction> | null>(null);

export const ChatProvider = ({ children }) => {
  const init = JSON.parse(localStorage.getItem("SESSIONS") || "") || initState;
  const [state, dispatch] = useReducer(reducer, init);
  const actionList = action(state, dispatch);
  const latestState = useRef(state);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("SESSIONS") || "");
    if (savedState) {
      dispatch({ type: GlobalActionType.SET_STATE, payload: savedState });
    }
  }, []);

  // get user
  useEffect(() => {
    console.log("fetch user");
    fetchAndGetUser(dispatch);
  }, [])


  useEffect(() => {
    const stateToSave = latestState.current;
    localStorage.setItem("SESSIONS", JSON.stringify(stateToSave));
  }, [latestState.current]);


  return (<>
    <ChatContext.Provider value={{ ...state, ...actionList }}>
      <MessagesContext.Provider value={dispatch}>
        {children}
      </MessagesContext.Provider>
    </ChatContext.Provider>
  </>
  );
};

export const useGlobal = () => useContext(ChatContext);
export const useMessages = () => useContext(MessagesContext);


