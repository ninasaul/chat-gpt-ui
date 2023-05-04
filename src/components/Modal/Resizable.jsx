import React, { useState, useLayoutEffect, useRef } from 'react';

export const Resizable = ({ children }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const resizeRef = useRef(null);

  useLayoutEffect(() => {
    setSize({
      width: resizeRef.current.offsetWidth,
      height: resizeRef.current.offsetHeight,
    });
    setPosition({
      x: resizeRef.current.offsetLeft,
      y: resizeRef.current.offsetTop,
    });
  }, []);

  const handleMouseDown = (event) => {
    setIsResizing(true);
  };

  const handleMouseMove = (event) => {
    if (isResizing) {
      setSize({
        width: event.clientX - position.x,
        height: event.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      className='resizable'
      ref={resizeRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ width: size.width, height: size.height, position: 'absolute' }}
    >
      {children}
    </div>
  );
};
