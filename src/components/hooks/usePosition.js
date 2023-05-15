import { useState, useEffect } from "react";

export function usePosition(ref) {
  const [position, setPosition] = useState({});

  useEffect(() => {
    function handlePosition() {
      if (ref.current) {
        // const { x, y, ...rest } = ref.current.getBoundingClientRect();
        const pos = ref.current.getBoundingClientRect().toJSON();
        console.log(pos);
        setPosition(pos);
      }
    }
    handlePosition();
    () => window.addEventListener("resize", handlePosition);
    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [ref.current]);

  return position;
}
