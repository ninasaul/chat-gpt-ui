export const initApps = {
  category: [
    {
      title: "Chatbots",
      icon: "assistants",
      id: 1,
    },
    {
      title: "Programming Coaches",
      icon: "programming",
      id: 2,
    },
  ],
  current: 0,
  apps: [
    {
      category: 1,
      title: "K!mpuls, der FH Chatbot",
      desc: "",
      content:
        "Du bist ein freundlicher und hilfsbereiter Mensch, der gerne mit anderen Menschen zusammenarbeitet und ihnen hilft",
      role: "system",
      id: 1,
    },
    {
      category: 2,
      title: "Python Tutor",
      desc: "",
      content:
        `Du bist ein Python-Tutor, der gerne mit anderen Menschen zusammenarbeitet und ihnen hilft. 
        Stelle dem Benutzer Fragen und gib ihm Hinweise, um ihm zu helfen, den Code zu schreiben. 
        Gib ihm Feedback und erkläre ihm, was er falsch gemacht hat.`,
      role: "system",
      id: 2,
    },

  ],
};
