export const initState = {
  chat: [
    {
      title: "Generate a React hooks  useLocalStorage",
      ct: "2023-12-12",
      id: 92839,
      messages: [
        {
          id: 1682511616366,
          sentTime: "2023/4/26 20:20:16",
          role: "user",
          content: "React写一个Modal组件\n",
        },
        {
          id: 1682511616366,
          sentTime: "2023/4/26 20:20:16",
          role: "assistant",
          content:
            '以下是一个简单的React Modal组件示例：\n\n```jsx\nimport React, { useState } from \'react\';\n\nconst Modal = ({ isOpen, onClose, children }) => {\n  const [isModalOpen, setIsModalOpen] = useState(isOpen);\n\n  const handleClose = () => {\n    setIsModalOpen(false);\n    onClose();\n  };\n\n  return (\n    <>\n      {isModalOpen && (\n        <div className="modal">\n          <div className="modal-content">\n            <span className="close" onClick={handleClose}>\n              &times;\n            </span>\n            {children}\n          </div>\n        </div>\n      )}\n    </>\n  );\n};\n\nexport default Modal;\n```\n\n在这个组件中，我们使用useState钩子来跟踪模态框是否打开。当isOpen prop改变时，我们更新状态以反映新值。\n\n我们还定义了一个叫做handleClose的函数，它将关闭模态框并调用onClose回调函数（如果有）。\n\n最后，我们返回一个包含模态框内容的div元素，并根据isModalOpen状态决定是否呈现该元素。',
          streaming: false,
        },
      ],
    },
    {
      title: "Generate useLocalStorage",
      id: 321123123,
      ct: "2023-12-12",
      messages: [
        {
          content: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          content:
            "可以使用 React 的 lazy-loading 功能以及按需加载样式的方式来实现动态加载 CSS。\n\n1. 创建一个懒加载组件：\n\n```\nimport React, {lazy} from 'react';\n\nconst MyComponent = lazy(() => import('./MyComponent'));\n```\n\n2. 在组件中，当组件挂载时动态添加 CSS 文件：\n\n```\nimport React, {useEffect} from 'react';\n\nfunction MyComponent() {\n useEffect(() => {\n const link = document.createElement('link');\n link.href = '/path/to/my-component.css';\n link.rel = 'stylesheet';\n document.head.appendChild(link);\n\n return () => {\n document.head.removeChild(link);\n }\n }, []);\n\n return (\n <div>\n {/* 组件内容 */}\n </div>\n );\n}\n```\n在 useEffect hook 中，创建了一个 link 标签并添加到页面头部，在组件 unmount 时将其移除。使得样式动态的加载进去。\n\n这样就可以实现组件动态加载 CSS。",
        },
      ],
    },
  ],
  currentChat: 0,
  options: {
    account: {
      name: "AI",
      avatar: "",
    },
    general: {
      language: "English",
      theme: "light",
      sendCommand: "Enter",
    },
    model: {
      temperature: 1,
      model: "gpt-3.5-turbo",
      apiKey: "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",
      max_tokens: 5,
      stream: true,
    },
  },
  is: {
    typeing: false,
    config: true,
    fullScreen: true,
    sidebar: true,
    inputing: false,
  },
  typeMessage: {},
  version: "0.1.0",
};
