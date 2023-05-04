import React, { useMemo } from "react";
import { classnames } from "../utils";
import PropTypes from 'prop-types'
import styles from "./tooltip.module.less";
export function Tooltip({ text, className, children, position }) {
  const memoizedChildren = useMemo(() => children, [children]);
  return (
    <div className={classnames(styles.tooltip, className)}>
      {memoizedChildren}
      <div className={classnames(styles.container, styles[position])}>
        <div className={styles.inner}>
          {text}
        </div>
      </div>
    </div >
  );
}

Tooltip.defaultProps = {
  position: 'top'
}

Tooltip.propTypes = {
  position: PropTypes.string,
}
