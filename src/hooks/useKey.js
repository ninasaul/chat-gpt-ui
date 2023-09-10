import { useEffect, useRef } from 'react';

export function useCtrlEnterSend(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyDown(event) {
      const isCtrlEnter = (event.ctrlKey || event.metaKey) && event.keyCode === 13;
      if (isCtrlEnter) {
        event.preventDefault();
        callbackRef.current();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

