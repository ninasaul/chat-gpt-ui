import { useEffect, useState } from "react";

export function useKeyboard(targetKeys, options = {}) {
  const { event = "keydown" } = options;
  const [keysPressed, setKeyPressed] = useState([]);
  const [modifierKeyPressed, setModifierKeyPressed] = useState(false);

  const downHandler = ({ key, shiftKey, ctrlKey, altKey, metaKey }) => {
    if (["Shift", "Control", "Alt", "Meta"].includes(key)) {
      setModifierKeyPressed(true);
      return;
    }

    const keyCombo = [key];
    if (modifierKeyPressed) {
      if (shiftKey) keyCombo.unshift("Shift");
      if (ctrlKey) keyCombo.unshift("Control");
      if (altKey) keyCombo.unshift("Alt");
      if (metaKey) keyCombo.unshift("Meta");
    }

    if (keyCombo.every((key) => keysPressed.includes(key))) {
      return;
    }

    setKeyPressed((keysPressed) => [...keysPressed, ...keyCombo]);
  };

  const upHandler = ({ key, shiftKey, ctrlKey, altKey, metaKey }) => {
    if (["Shift", "Control", "Alt", "Meta"].includes(key)) {
      setModifierKeyPressed(false);
      return;
    }

    const keyCombo = [key];
    if (modifierKeyPressed) {
      if (shiftKey) keyCombo.unshift("Shift");
      if (ctrlKey) keyCombo.unshift("Control");
      if (altKey) keyCombo.unshift("Alt");
      if (metaKey) keyCombo.unshift("Meta");
    }

    const index = keysPressed.findIndex(
      (combo) => combo.toString() === keyCombo.toString()
    );
    if (index === -1) {
      return;
    }

    const newKeysPressed = [...keysPressed];
    newKeysPressed.splice(index, 1);
    setKeyPressed(newKeysPressed);
  };

  useEffect(() => {
    if (targetKeys.length === 0) return;

    const isListening = true;
    if (isListening) {
      window.addEventListener(event, downHandler);
      window.addEventListener("keyup", upHandler);
    }

    return () => {
      if (isListening) {
        window.removeEventListener(event, downHandler);
        window.removeEventListener("keyup", upHandler);
      }
    };
  }, [event, targetKeys, keysPressed]);

  return keysPressed;
}
