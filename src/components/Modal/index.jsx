import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Draggable } from "./Draggable";
import { classnames } from "../utils";
import { Button } from "../Button";
import styles from './modal.module.less'

export const Modal = (props) => {
  const { visible, onClose, children, title, footer, className } = props
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 500, height: 300 });

  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(visible)
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose && onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleDrag = (newX, newY) => {
    setX(newX);
    setY(newY);
  };

  const handleClose = () => {
    setHidden(false)
    onClose && onClose()
  }
  const container = (
    <div className={styles.overlay}>
      <Draggable x={x} y={y} onDrag={handleDrag}>
        <div className={classnames(styles.modal, className)}>
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <Button type="icon" icon="close" onClick={handleClose} />
          </div>
          <div
            className={styles.container}
            style={{
              width: size.width,
              height: size.height,
              top: position.y,
              left: position.x
            }}
          >
            {children}
          </div>
          <div className={styles.footer}>
            <div>
              {
                footer && <React.Fragment>
                  <Button>取消</Button>
                  <Button>确定</Button>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </Draggable >
    </div >
  );
  return hidden ? ReactDOM.createPortal(container, document.body) : null;
};


Modal.defaultProps = {
  title: '',
}