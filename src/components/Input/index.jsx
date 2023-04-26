import React, { forwardRef } from 'react'
import './style.less'
import { setClassName } from '../utils'

export const Input = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    className,
    showClear,
    onClear,
    children,
    ...rest
  } = props;

  const handleClearClick = () => {
    onClear && onClear();
  };
  const styleClass = setClassName({
    name: 'input',
    className
  })
  return (
    <div className={styleClass}>
      <input
        {...rest}
        ref={ref}
        value={value}
        className={setClassName({ name: 'input-content' })}
        onChange={e => onChange && onChange(e)}
      />
      {showClear && value && (
        <div onClick={handleClearClick} className="ico-clear" />
      )}
      {children}
    </div>
  );
});

Input.defaultProps = {
  showClear: false,
};

