import React, { useState, useEffect, useRef } from "react";

const Draggable = ({ children, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = position.x + event.clientX;
        const newY = position.y + event.clientY;
        setPosition({ x: newX, y: newY });
        onDrag && onDrag(event, { x: newX, y: newY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => setIsDragging(false));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
    };
  }, [isDragging, onDrag, position.x, position.y]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setPosition({
      x: ref.current.offsetLeft - event.clientX,
      y: ref.current.offsetTop - event.clientY
    });
  };

  return (
    <div
      className="draggable"
      ref={ref}
      style={{ top: position.y, left: position.x, width: 500, height: 800 }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;
