import React, { useState, useEffect } from 'react'
import { useTheme } from '../hooks'
import { Icon } from '../Icon'

export function Theme({ onChange }) {
  const [current, toggleCurrent] = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(media.matches);

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const change = () => {
    toggleCurrent()
    onChange(current)
  }

  return <Icon onClick={change} type={current} />
}
