import { useEffect } from "react";

export function useSendKey(callback, key) {
  console.log("useSendKey", key);

  const handleCommandEnter = (event) => {
    console.log("handleCommadEnter", event);
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      event.preventDefault();
      callback && callback();
    }
  };

  const handleEnter = (event) => {
    console.log("handleEnter", event);
    if (event.keyCode === 13) {
      event.preventDefault();
      callback && callback();
    }
  };

  useEffect(() => {
    document.removeEventListener("keydown", handleCommandEnter);
    document.removeEventListener("keydown", handleEnter);
    document.addEventListener("keydown", key === "ENTER" ? handleEnter : handleCommandEnter
    );
    return () => {
      document.removeEventListener("keydown", key === "ENTER" ? handleEnter : handleCommandEnter);
    };
  }, [callback, key]);
}
