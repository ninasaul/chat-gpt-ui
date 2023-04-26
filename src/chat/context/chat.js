export const fetchMessage = async ({ messages, options, systemMessage }) => {
  const { model, apiKey, baseUrl } = options || {};
  const apiMessages = messages.map((item) => {
    const { content, role } = item;
    // let role = "";
    // if (sender === "assistant") {
    //   role = "assistant";
    // } else {
    //   role = "user";
    // }
    return { role, content };
  });

  const apiRequestBody = {
    model,
    messages: systemMessage ? [systemMessage, ...apiMessages] : apiMessages,
  };
  const data = await fetch(
    baseUrl || "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    }
  );
  return data.json();
};
