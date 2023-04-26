import React, { useMemo } from "react";
import { Ui } from "../Ui";
import "./style.less";
import { setClassName } from "../utils";

export function Tooltip({ text, className, type, children, position }) {
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <Ui name="tooltip" className={className} extra={[type]}>
      {memoizedChildren}
      <div className={`${setClassName({ name: 'tooltip-container' })}${position}`}>
        <div className={setClassName({ name: 'tooltip-inner' })}>
          {text}
        </div>
      </div>
    </Ui>
  );
}

Tooltip.defaultProps = {
  position: 'top'
}