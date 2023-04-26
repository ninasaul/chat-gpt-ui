import { fetchMessage } from "./chat";
import { randomNum } from "../utils";
export default function action(state, dispatch) {
  const setState = (payload) =>
    dispatch({
      type: "SET_STATE",
      payload: { ...payload },
    });
  return {
    async sendMessage() {
      const { typeingMessage, options, chat, is, currentChat } = state;
      if (typeingMessage?.content) {
        const newMessage = {
          ...typeingMessage,
          sentTime: Date.now(),
        };
        const messages = [...chat[currentChat].messages, newMessage];
        const newChat = [...chat];
        newChat.splice(currentChat, 1, { ...chat[currentChat], messages });
        setState({
          is: { ...is, typeing: true },
          typeingMessage: {},
          chat: newChat,
        });
        try {
          const res = await fetchMessage({
            messages,
            options: options.model,
          });
          const { error } = res;
          if (error) {
            newChat.splice(currentChat, 1, {
              ...chat[currentChat],
              messages,
              error,
            });
            console.log("23newChat", newChat);
            setState({
              chat: newChat,
            });
          }
        } finally {
          setState({ is: { ...is, typeing: false } });
        }
      }
    },

    newChat() {
      const { chat } = state;
      const chatList = [
        ...chat,
        {
          title: "New Chat",
          id: randomNum(),
          messages: [],
          ct: Date.now(),
        },
      ];
      setState({ chat: chatList });
    },

    setMessage(content) {
      const typeingMessage = {
        role: "user",
        content,
      };
      setState({ is: { ...state.is, typeing: true }, typeingMessage });
    },

    setOptions() {
      const { options } = state;
      setState({ options: { ...options, ...arg } });
    },

    setModel() {},

    setGeneral(arg = {}) {
      const { options } = state;
      const { general } = options;
      setState({ options: { ...options, general: { ...general, ...arg } } });
    },
    setIs(arg) {
      const { is } = state;
      setState({ is: { ...is, ...arg } });
    },

    setState,
  };
}
