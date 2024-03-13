import React, {
  useRef,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import action from "./action";
import reducer from "./reducer";
import { initState } from "./initState";

export const ChatContext = createContext(null);
export const MessagesContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const init = JSON.parse(localStorage.getItem("SESSIONS")) || initState;
  const [state, dispatch] = useReducer(reducer, init);
  const actionList = action(state, dispatch);
  const latestState = useRef(state);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("SESSIONS"));
    if (savedState) {
      dispatch({ type: "SET_STATE", payload: savedState });
    }
  }, []);

  useEffect(() => {
    const stateToSave = latestState.current;
    localStorage.setItem("SESSIONS", JSON.stringify(stateToSave));
  }, [latestState.current]);

  // get user
  useEffect(() => {
    fetch("https://login.ki.fh-swf.de/openai/api/dashboard")
      .catch(err => {
        console.log("getting user: ", err);
        window.location.href = "https://login.ki.fh-swf.de/openai/api/login";
      })
      .then(res => {
        console.log("getting user: ", res.status);
        if (res.status === 401) {
          window.location.href = "https://login.ki.fh-swf.de/openai/api/login";
        }
        return res.json()
      })
      .then(data => {
        const user = {
          name: data.name,
          preferred_userame: data.preferred_username,
          email: data.email,
          sub: data.sub
        }
        localStorage.setItem("USER", JSON.stringify(user));
        dispatch({ type: "SET_STATE", payload: { user } });
      })

  }, [latestState.current.user])

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
