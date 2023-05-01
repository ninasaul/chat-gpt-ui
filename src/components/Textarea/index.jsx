import React, { forwardRef, useState } from 'react'
import './style.less'
import { setClassName } from '../utils';
import Proptypes from 'prop-types'
import { Button } from '../Button';

export const Textarea = forwardRef((props, ref) => {
  const {
    onChange,
    placeholder,
    className,
    showClear,
    disable,
    children,
    rows,
    maxHeight,
    value,
    defaultValue,
    onClear,
    ...rest
  } = props;

  const [height, setHeight] = useState('auto')

  function handleChange(event) {
    setHeight('auto');
    setHeight(`${event.target.scrollHeight}px`);
    onChange && onChange(event.target.value);
  }
  function handleClear() {
    onChange && onChange("");
    onClear && onClear();
  }

  const classList = setClassName({
    name: 'textarea',
    extra: [className]
  })

  return (
    <div className={classList}>
      <div className={
        setClassName({
          name: 'textarea-inner'
        })
      }>
        <textarea
          ref={ref}
          rows={rows}
          style={{ height }}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          {...rest}
        />
      </div>
      {showClear && <Button type="icon" onClick={handleClear} icon="cancel" />}
    </div>
  );
});

Textarea.defaultProps = {
  showClear: false,
  disable: false,
  defaultValue: '',
  maxHeight: 200,
  placeholder: '',
  rows: '1',
};

Textarea.propTypes = {
  showClear: Proptypes.bool,
  onClear: Proptypes.func,
  className: Proptypes.string,
  onChange: Proptypes.func,
  disable: Proptypes.bool,
  placeholder: Proptypes.string,
  maxHeight: Proptypes.number,
  rows: Proptypes.string,
}
