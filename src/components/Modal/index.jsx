import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Resizable from "./Resizable";
import Draggable from "./Draggable";
import './style.less'

export const Modal = (props) => {
  const { isOpen, onClose, children } = props
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleResize = (_, { size: newSize }) => {
    setSize(newSize);
  };

  const handleDrag = (_, { x, y }) => {
    setPosition({ x, y });
  };

  const handleMaximizeClick = () => {
    setIsMaximized(!isMaximized);
  };

  const content = (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>Modal Title</span>
          <button onClick={onClose}>X</button>
        </div>
        <Resizable onResize={handleResize}>
          <Draggable onDrag={handleDrag}>
            <div
              className="modal-content"
              style={{
                width: size.width,
                height: size.height,
                top: position.y,
                left: position.x
              }}
            >
              <p>Modal Content</p>
              {children}
            </div>
          </Draggable>
        </Resizable>
        <div className="modal-footer">
          <button onClick={handleMaximizeClick}>
            {isMaximized ? "Restore" : "Maximize"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(content, document.body);
};


