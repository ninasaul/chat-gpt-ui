import { createParser } from "eventsource-parser";

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
    } catch (e) {
      // ignore
    }
    throw new Error(
      `${response.status} · ${response.statusText}${
        errorPayload ? " · " + JSON.stringify(errorPayload) : ""
      }`
    );
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
  controller,
}) => {
  const { baseUrl, ...rest } = options;
  const url = fetchBaseUrl(baseUrl);
  const headers = fetchHeaders({ ...rest });
  const body = JSON.stringify(fetchBody({ messages, options }));
  const response = await fetch(url, {
    method,
    headers,
    body,
    signal: controller.signal,
  });
  await throwError(response);
  return response;
};

export async function fetchStream({
  options,
  messages,
  onMessage,
  onEnd,
  onStar,
}) {
  let answer = "";
  const controller = new AbortController();
  const res = await fetchAction({ options, messages, controller }).catch(
    async (err) => {
      // await onError(err);
      console.log(err);
    }
  );
  if (!res) return;
  if (!res.ok) {
    console.log(err);
    // await onError(resp);
    return;
  }
  const parser = createParser((event) => {
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
        console.log(data);
        answer += data.choices[0].delta.content;
        onMessage(answer);
      }
    }
  });
  let hasStarted = false;
  for await (const chunk of streamAsyncIterable(res.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
    if (!hasStarted) {
      hasStarted = true;
      // await onStart(str);
    }
  }
  await onEnd();
}

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
