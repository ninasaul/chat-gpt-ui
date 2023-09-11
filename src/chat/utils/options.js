export const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
export const shortcutKey = isMac ? "Command+Enter" : "Ctrl+Enter";
export const keyborad = {
  Command: "Window",
  Option: "Alt",
  Control: "Ctrl",
  Shift: "Shift",
};

export const keyboradArray = isMac
  ? Object.keys(keyborad)
  : Object.values(keyborad);
export const themeOptions = [
  {
    label: "Auto",
    value: "auto",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

export const sendCommandOptions = [
  {
    label: "Enter",
    value: "ENTER",
  },
  {
    label: shortcutKey,
    value: "COMMAND_ENTER",
  },
  {
    label: shortcutKey,
    value: "ALT_ENTER",
  },
];

export const modelOptions = [
  {
    label: "gpt-3.5-turbo",
    value: "gpt-3.5-turbo",
  },
  {
    label: "gpt-4",
    value: "gpt-4",
  },
];

export const languageOptions = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "简体中文",
    value: "zh",
  },
  {
    label: "日本",
    value: "jp",
  },
];

export const sizeOptions = [
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Middle",
    value: "middle",
  },
  {
    label: "Large",
    value: "large",
  },
];
