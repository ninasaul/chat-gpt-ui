import { createParser } from "eventsource-parser";
import { setAbortController } from "./abortController.mjs";

export async function* streamAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export const fetchBaseUrl = (baseUrl) =>
  baseUrl || "https://api.openai.com/v1/chat/completions";

export const fetchHeaders = (options = {}) => {
  const { organizationId, apiKey } = options;
  return {
    Authorization: "Bearer " + apiKey,
    "Content-Type": "application/json",
    ...(organizationId && { "OpenAI-Organization": organizationId }),
  };
};

export const throwError = async (response) => {
  if (!response.ok) {
    let errorPayload = null;
    try {
      errorPayload = await response.json();
      console.log(errorPayload);
    } catch (e) {
      // ignore
    }
  }
};

export const fetchBody = ({ options = {}, messages = [] }) => {
  const { top_p, n, max_tokens, temperature, model, stream } = options;
  return {
    messages,
    stream,
    n: 1,
    ...(model && { model }),
    ...(temperature && { temperature }),
    ...(max_tokens && { max_tokens }),
    ...(top_p && { top_p }),
    ...(n && { n }),
  };
};

export const fetchAction = async ({
  method = "POST",
  messages = [],
  options = {},
  signal,
}) => {
  const { baseUrl, ...rest } = options;
  const url = fetchBaseUrl(baseUrl);
  const headers = fetchHeaders({ ...rest });
  const body = JSON.stringify(fetchBody({ messages, options }));
  const response = await fetch(url, {
    method,
    headers,
    body,
    signal,
  });
  return response;
};

export const fetchStream = async ({
  options,
  messages,
  onMessage,
  onEnd,
  onError,
  onStar,
}) => {
  let answer = "";
  const { controller, signal } = setAbortController();
  console.log(signal, controller);
  const result = await fetchAction({ options, messages, signal }).catch(
    (error) => {
      onError && onError(error, controller);
    }
  );
  if (!result) return;
  if (!result.ok) {
    const error = await result.json();
    onError && onError(error);
    return;
  }

  const parser = createParser((event) => {
    console.log(event.data);
    if (event.type === "event") {
      if (event.data === "[DONE]") {
        return;
      }
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        return;
      }
      if ("content" in data.choices[0].delta) {
        answer += data.choices[0].delta.content;
        console.log(data);
        onMessage && onMessage(answer, controller);
      }
    }
  });
  let hasStarted = false;
  for await (const chunk of streamAsyncIterable(result.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
    if (!hasStarted) {
      hasStarted = true;
      onStar && onStar(str, controller);
    }
  }
  await onEnd();
};
