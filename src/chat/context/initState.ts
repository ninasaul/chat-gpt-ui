import { GlobalState } from "./types";

import i18n from "../../i18n/config";
const { t } = i18n;

export const initState: GlobalState = {
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
  currentApp: null,
  options: {
    account: {
      name: "Anonymus",
      avatar: "",
    },
    general: {
      language: "de",
      theme: "light",
      sendCommand: "ENTER",
      size: "normal",
    },
    openai: {
      baseUrl: "https://openai.ki.fh-swf.de/api/v1/chat/completions",
      organizationId: "",
      temperature: 1,
      model: "gpt-4-turbo-preview",
      apiKey: "unused",
      max_tokens: 2048,
      n: 1,
      top_p: 1,
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
