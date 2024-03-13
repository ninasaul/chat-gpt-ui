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
import { sha256Digest } from "../utils";

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

  // get user
  useEffect(() => {

    fetch("https://login.ki.fh-swf.de/openai/api/user")
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
      .then(user => {
        sha256Digest(user.email).then(hash => {
          user.hash = hash;
          user.avatar = `https://www.gravatar.com/avatar/${hash}`;
          localStorage.setItem("USER", JSON.stringify(user));
          dispatch({ type: "SET_STATE", payload: { user } });
        })
      })
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
