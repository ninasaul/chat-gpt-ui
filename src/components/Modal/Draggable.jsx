import React, { useState, useRef } from 'react';

export const Draggable = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setPosition({
      x: event.clientX - dragRef.current.offsetLeft,
      y: event.clientY - dragRef.current.offsetTop,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      dragRef.current.style.left = `${event.clientX - position.x}px`;
      dragRef.current.style.top = `${event.clientY - position.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'fixed' }}
    >
      {children}
    </div>
  );
};
