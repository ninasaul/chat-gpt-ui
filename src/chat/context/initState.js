export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: "Generate useLocalStorage",
      id: 321123123,
      ct: "2023-12-12",
      messages: [
        {
          content: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "1682827639323",
          role: "user",
          id: 123,
        },
      ],
    },
    {
      title: "Generate a React hooks  useLocalStorage",
      ct: "2023-12-12",
      id: 92839,
      messages: [
        {
          id: 1682511616366,
          sentTime: "1682827639313",
          role: "user",
          content: "React写一个Modal组件\n",
        },
        {
          id: 1682511616366,
          sentTime: "1681827632313",
          role: "assistant",
          content:
            '以下是一个简单的React Modal组件示例：\n\n```jsx\nimport React, { useState } from \'react\';\n\nconst Modal = ({ isOpen, onClose, children }) => {\n  const [isModalOpen, setIsModalOpen] = useState(isOpen);\n\n  const handleClose = () => {\n    setIsModalOpen(false);\n    onClose();\n  };\n\n  return (\n    <>\n      {isModalOpen && (\n        <div className="modal">\n          <div className="modal-content">\n            <span className="close" onClick={handleClose}>\n              &times;\n            </span>\n            {children}\n          </div>\n        </div>\n      )}\n    </>\n  );\n};\n\nexport default Modal;\n```\n\n在这个组件中，我们使用useState钩子来跟踪模态框是否打开。当isOpen prop改变时，我们更新状态以反映新值。\n\n我们还定义了一个叫做handleClose的函数，它将关闭模态框并调用onClose回调函数（如果有）。\n\n最后，我们返回一个包含模态框内容的div元素，并根据isModalOpen状态决定是否呈现该元素。',
        },
      ],
    },
    {
      title: "ex",
      ct: "2032-12-23",
      id: 2381923,
      messages: [],
    },
  ],
  currentChat: 0,
  options: {
    account: {
      name: "CHAT——AI",
      avatar: "",
    },
    general: {
      language: "English",
      theme: "light",
      command: "COMMAND_ENTER",
      size: "normal",
    },
    openai: {
      baseUrl: "",
      organizationId: "",
      temperature: 1,
      model: "gpt-3.5-turbo",
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
  version: "0.1.0",
  cotent: "",
};
