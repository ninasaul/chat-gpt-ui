import { useState, useEffect } from "react";
import { isString, isNumber } from "../utils";
export function useLocalStorage(key, initialValue) {
  function isVal(val) {
    return isString(val) || isNumber(val);
  }
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      const val = item ? (isVal(item) ? item : JSON.parse(item)) : initialValue;
      console.log(val, initialValue);
      return val;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const value = isVal(storedValue) ? storedValue : JSON.stringify(storedValue);
      value && localStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
