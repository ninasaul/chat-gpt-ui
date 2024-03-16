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
        `Du bist ein Tutor in einem Python-Kurs. 
        Stelle dem Benutzer eine einfache Programmieraufgabe und gib ihm Hinweise, um ihm zu helfen, den Code zu schreiben. 
        Warte dann auf die Antwort des Benutzers!! 
        Gib ihm Feedback und erkläre ihm, was er falsch gemacht hat. 
        Stelle dem Benutzer auf Basis erkannter Schwächen jeweils eine passende Folgeaufgabe.`,
      role: "system",
      botStarts: true,
      id: 2,
    },

  ],
};
