import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './dragLayout.module.less';

export const DragLayout = ({ leftWidth, rightWidth, onChange, left, right }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [width, setWidth] = useState({ left: 300, right: 500 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setContainerWidth(e.target.parentNode.offsetWidth);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }
    const delta = e.clientX - dragStartX;
    const newLeftWidth = leftWidth + delta;
    const newRightWidth = rightWidth - delta;
    if (newLeftWidth >= 0 && newRightWidth >= 0) {
      setWidth({ left: newLeftWidth, right: newRightWidth })
      onChange && onChange(newLeftWidth, newRightWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left} style={{ width: width.left }} ref={leftRef}>
        {left}
      </div>
      <div
        className={styles.dragHandle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div className={styles.right} style={{ width: width.right }} ref={rightRef}>
        {right}
      </div>
    </div>
  );
};

DragLayout.defaultProps = {
  leftWidth: 300,
  rightWidth: 300,
}
DragLayout.propTypes = {
  leftWidth: PropTypes.number.isRequired,
  rightWidth: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

