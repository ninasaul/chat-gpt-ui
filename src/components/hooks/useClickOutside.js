import React, { useState, useEffect } from "react";

export function useClickOutside(ref, initialState) {
  const [visible, setVisible] = useState(initialState);
  const handleClickOutside = (event) => {
    if (ref?.current && !ref.current.contains(event.target)) {
      setVisible(false);
    }
    console.log(event);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return [visible, setVisible];
}
