import { useEffect } from "react";

export function useSendKey(callback, key) {
  const handleCommandEnter = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      event.preventDefault();
      console.log("COMMAND+ENTER");
      callback && callback();
    }
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log("ENTER");
      callback && callback();
    }
  };

  useEffect(() => {
    document.removeEventListener("keydown", handleCommandEnter);
    document.removeEventListener("keydown", handleEnter);
    document.addEventListener("keydown", key === "ENTER" ? handleEnter : handleCommandEnter
    );
    return () => {
      document.removeEventListener( "keydown", key === "ENTER" ? handleEnter : handleCommandEnter);
    };
  }, [callback, key]);
}
