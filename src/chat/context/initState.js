import i18next from "i18next";
import config from "../../i18n/config";

i18next.init(config)
const { t } = i18next;

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
      command: "COMMAND_ENTER",
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
  cotent: "",
};
