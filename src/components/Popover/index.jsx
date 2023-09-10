import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './popover.module.less';
import { classnames } from '../utils';
import { usePosition, useClickOutside } from '../hooks'

export function Popover(props) {
  const { content, position, trigger } = props;
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const boxRef = useRef(null);
  const [visible, setVisible] = useClickOutside(boxRef, false)
  const [contentPosition, setContenttPosition] = useState({})
  const { x, y, width, height } = usePosition(triggerRef)
  const { width: containerWidth, height: containerHeight } = usePosition(containerRef)

  useEffect(() => {
    if (x && y && width) {
      setContenttPosition({ left: x + width, top: y, })
    }
  }, [x, y, width])

  const togglePanel = () => {
    setVisible(!visible)
  }
  const handleMouseEnter = () => {
    trigger === 'hover' && togglePanel(true)
  }
  const handleMouseLeave = () => {
    trigger === 'hover' && setVisible(false)
  }
  const handleTrigger = () => {
    trigger === 'click' && setVisible(!visible)
  }
  return (
    <div ref={boxRef} className={styles.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={triggerRef} onClick={handleTrigger} >
        {props.children}
      </div>
      {visible && <div
        ref={containerRef}
        className={classnames(styles.content, styles[position])}
        style={contentPosition}
      >
        {content}
      </div>}
    </div>
  );
}

Popover.propTypes = {
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  trigger: PropTypes.oneOf(['hover', 'click']),
};

Popover.defaultProps = {
  position: 'top',
  trigger: 'hover'
};
