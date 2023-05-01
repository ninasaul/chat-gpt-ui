import { useCallback, useEffect } from "react";

export function useDebounce(callback, delay) {
  const debouncedCallback = useCallback(
    (...args) => {
      const timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    },
    [callback, delay]
  );

  useEffect(() => {
    return debouncedCallback.cancel;
  }, [debouncedCallback]);

  return debouncedCallback;
}
