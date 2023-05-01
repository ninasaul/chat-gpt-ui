/**
 * @typedef {object} Model
 * @property {string} value
 * @property {string} desc
 */
/**
 * @type {Object.<string,Model>}
 */
export const Models = {
  chatgptFree35: {
    value: "text-davinci-002-render-sha",
    desc: "ChatGPT (Web)",
  },
  chatgptPlus4: { value: "gpt-4", desc: "ChatGPT (Web, GPT-4)" },
  chatgptApi35: { value: "gpt-3.5-turbo", desc: "ChatGPT (GPT-3.5-turbo)" },
  bingFree4: { value: "", desc: "Bing (Web, GPT-4)" },
  bingFreeSydney: { value: "", desc: "Bing (Web, GPT-4, Sydney)" },
  poeAiWebSage: { value: "sage", desc: "Poe AI (Web, Sage)" },
  poeAiWebGPT4: { value: "gpt-4", desc: "Poe AI (Web, GPT-4)" },
  poeAiWebClaudePlus: { value: "claude+", desc: "Poe AI (Web, Claude+)" },
  poeAiWebClaude: { value: "claude", desc: "Poe AI (Web, Claude)" },
  chatgptApi4_8k: { value: "gpt-4", desc: "ChatGPT (GPT-4-8k)" },
  chatgptApi4_32k: { value: "gpt-4-32k", desc: "ChatGPT (GPT-4-32k)" },
  gptApiDavinci: { value: "text-davinci-003", desc: "GPT-3.5" },
  customModel: { value: "", desc: "Custom Model" },
  azureOpenAi: { value: "", desc: "ChatGPT (Azure)" },
  waylaidwandererApi: { value: "", desc: "Waylaidwanderer API (Github)" },
  poeAiWebCustom: { value: "", desc: "Poe AI (Web, Custom)" },
  poeAiWebChatGpt: { value: "chatgpt", desc: "Poe AI (Web, ChatGPT)" },
  poeAiWebDragonfly: { value: "dragonfly", desc: "Poe AI (Web, Dragonfly)" },
};
