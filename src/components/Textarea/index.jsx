import React, { forwardRef, useRef, useState } from 'react'
import './style.less'
import { setClassName } from '../utils';

export const Textarea = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    className,
    showClear,
    onClear,
    children,
    ...rest
  } = props;
  const textareaRef = useRef();
  const handleClearClick = () => {
    onClear && onClear();
  };

  const [rows, setRows] = useState(1);

  function handleChange(event) {
    const textareaLineHeight = 20;
    const previousRows = textareaRef.current.rows;
    event.target.rows = 1;
    const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);
    event.target.rows = currentRows;

    if (currentRows !== previousRows) {
      setRows(currentRows);
    }

    onChange && onChange(event);
  }

  const classList = setClassName({
    name: 'textarea',
    extra: [className]
  })

  return (
    <div className={classList}>
      <textarea
        {...rest}
        ref={textareaRef}
        value={value}
        rows={rows}
        style={{ height: rows * 20 }}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {showClear && value && (
        <div onClick={handleClearClick} className="ico-clear" />
      )}
      {children}
    </div>
  );
});

Textarea.defaultProps = {
  showClear: false,
};

