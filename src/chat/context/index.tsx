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
import { initState } from "./initState";
import { fetchAndGetUser } from "../utils";


export enum GlobalActionType {
  SET_STATE = "SET_STATE",
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  IS_CONFIG = "IS_CONFIG",
};

export enum OptionActionType {
  GENERAL = "general",
  ACCOUNT = "account",
  OPENAI = "openai"
}

export type GeneralOptions = {
  language: string;
  theme: string;
  sendCommand: string;
  size: string;
};

export type AccountOptions = {
  name: string;
  avatar: string;
};

export type OpenAIOptions = {
  baseUrl: string;
  organizationId: string;
  temperature: number;
  top_p: number;
  model: string;
  apiKey: string;
  max_tokens: number;
  n: number;
  stream: boolean;
};

export type Options = {
  account: AccountOptions;
  general: GeneralOptions;
  openai: OpenAIOptions;
};

export type GlobalState = {
  conversation: any[];
  current: number;
  chat: any[];
  currentChat: number;
  options: Options;

  is: {
    typeing: boolean;
    config: boolean;
    fullScreen: boolean;
    sidebar: boolean;
    inputing: boolean;
    thinking: boolean;
    apps: boolean;
  };
  typeingMessage: any;
  user: any;
  version: string;
  content: string;
};

export type GlobalAction =
  | { type: GlobalActionType.SET_STATE; payload: Partial<GlobalState> }
  | { type: GlobalActionType.CHANGE_MESSAGE; payload: Partial<GlobalState> }
  | { type: GlobalActionType.IS_CONFIG; payload: Partial<GlobalState> };

export type OptionAction =
  | { type: OptionActionType.GENERAL; data: Partial<GeneralOptions>; }
  | { type: OptionActionType.ACCOUNT; data: Partial<AccountOptions>; }
  | { type: OptionActionType.OPENAI; data: Partial<OpenAIOptions>; };


export const ChatContext = createContext(null);
export const MessagesContext = createContext<Dispatch<GlobalAction> | null>(null);

export const ChatProvider = ({ children }) => {
  const init: GlobalState = JSON.parse(localStorage.getItem("SESSIONS")) || initState;
  const [state, dispatch] = useReducer(reducer, init);
  const actionList = action(state, dispatch);
  const latestState = useRef(state);

  useEffect(() => {
    latestState.current = state;
  }, [state]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("SESSIONS"));
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

export const useGlobal = () => useContext<GlobalAction & GlobalState>(ChatContext);
export const useMessages = () => useContext(MessagesContext);


