export function setAbortController(onStop) {
  const controller = new AbortController();
  const signal = controller.signal;

  const disconnect = () => {
    controller.abort();
    onStop && onStop();
  };

  signal.addEventListener("abort", () => {
    console.log("请求已取消");
  });

  return { controller, disconnect, signal };
}
