export const initApps = {
  category: [
    {
      title: "Programming",
      icon: "programming",
      id: 8,
    },
    {
      title: "personal-assistants",
      icon: "assistants",
      id: 1,
    },
    {
      title: "Productivity",
      icon: "productivity",
      id: 2,
    },
    {
      title: "Educational",
      icon: "education",
      id: 3,
    },
    {
      title: "Creative Writing",
      icon: "write",
      id: 4,
    },
    {
      title: "UX/UI developer",
      icon: "ui",
      id: 5,
    },
    {
      title: "Finance",
      icon: "finance",
      id: 6,
    },

    {
      title: "Entertainment",
      icon: "game",
      id: 9,
    },
    {
      title: "recommendations",
      icon: "recommendations",
      id: 10,
    },
    {
      title: "legal",
      icon: "legal",
      id: 11,
    },
    {
      title: "social-media",
      icon: "social-media",
      id: 12,
    },
  ],
  current: 0,
  apps: [
    {
      title: "Linux Terminal",
      desc: "Linux 终端",
      content:
        "我希望你能充当 Linux 终端的角色。我会输入命令，你会回复终端应该显示的内容。我希望你只回复一个唯一的代码块，不要写解释。除非我指示你这样做，否则不要输入命令。当我需要用英语告诉你一些事情时，我会用花括号 {像这样} 把文本括起来。我的第一个命令是 pwd。",
      role: "system",
      id: 8,
    },
    {
      title: "Code Reviewer",
      desc: "代码审查",
      content:
        "我希望你能充当面试官。我将成为候选人，你将问我有关 #position# 职位的面试问题。我希望你只回答面试官的问题。不要一次写下所有的对话。我只希望你与我进行面试。像面试官一样一个一个地问我问题，等待我的回答。不要写解释。我的第一句话是“嗨”。",
      role: "system",
      id: 8,
    },
    {
      title: "AI Programmer",
      desc: "Write a code and explain",
      role: "system",
      id: 12,
    },
    {
      title: "Compare Topic",
      desc: "Get diffrences with pros and cons",
      role: "system",
      id: 12,
    },
    {
      title: "Fin Prompt",
      desc: "Assume you are the CFO of a manufacturing company...",
      role: "system",
      content: "我是一个Prompt",
      id: 1,
    },
    {
      title: "Fin Prompt11",
      role: "system",
      desc: "How do you decide which option is best for your company?",
      content: "我是一个Prompt",
      id: 1,
    },
    {
      title: "Prompt22",
      content: "我是一个Prompt",
      desc: "Assume you are the CFO of a manufacturing company...",
      role: "system",
      id: 2,
    },
    {
      title: "Prompt33",
      content: "我是一个Prompt",
      desc: "Assume you are the CFO of a manufacturing company...",
      role: "system",
      id: 3,
    },
    {
      title: "Prompt$$",
      content: "我是一个Prompt",
      desc: "Assume you are the CFO of a manufacturing company...",
      role: "system",
      id: 4,
    },
  ],
};
