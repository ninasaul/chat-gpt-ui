
import i18n from "../../i18n/config";
const { t } = i18n;

export enum GlobalActionType {
  SET_STATE = "SET_STATE",
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  IS_CONFIG = "IS_CONFIG",
};
export type GlobalState = any;
export type GlobalAction =
  | { type: GlobalActionType.SET_STATE; payload: Partial<GlobalState> }
  | { type: GlobalActionType.CHANGE_MESSAGE; payload: Partial<GlobalState> }
  | { type: GlobalActionType.IS_CONFIG; payload: Partial<GlobalState> };

export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: t("chatbot_title"),
      id: 1,
      ct: "2023-12-12",
      messages: [
        {
          content: t("system_welcome"),
          sentTime: Date.now(),
          role: "system",
          id: 1,
        },
      ],
    },

  ],
  currentChat: 0,
  options: {
    account: {
      name: "Anonymus",
      avatar: "",
    },
    general: {
      language: "English",
      theme: "light",
      sendCommand: "ENTER",
      size: "normal",
    },
    openai: {
      baseUrl: "https://login.ki.fh-swf.de/openai/api/v1/chat/completions",
      organizationId: "",
      temperature: 1,
      model: "gpt-4",
      apiKey: "unused",
      max_tokens: 2048,
      n: 1,
      stream: true,
    },
  },
  is: {
    typeing: false,
    config: false,
    fullScreen: true,
    sidebar: true,
    inputing: false,
    thinking: false,
    apps: true,
  },
  typeingMessage: {},
  user: null,
  version: "0.1.0",
  content: "",
};
