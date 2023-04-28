import React, { forwardRef, useState } from 'react'
import './style.less'
import { setClassName } from '../utils'
import { Button } from '../Button'

export const Input = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    className,
    showClear,
    onClear,
    type,
    extra,
    showPassword,
    ...rest
  } = props;

  const handleClearClick = () => {
    onClear && onClear();
  };
  const [icon, setIcon] = useState('eye-close');


  return (
    <div className={setClassName({
      name: 'input',
      className,
      extra: [type]
    })}>
      {extra && <div className={setClassName({
        name: 'input',
        extra: ['extra']
      })}>{extra}</div>}
      <div className={setClassName({
        name: 'input',
        extra: ['inner']
      })}>
        <input
          {...rest}
          ref={ref}
          type={icon === 'eye-open' ? 'text' : type}
          value={value}
          className={setClassName({ name: 'input-content' })}
          onChange={e => onChange && onChange(e)}
        />
        {showClear && value && type !== 'password'(
          <Button onClick={handleClearClick} icon="clear" type="icon" />
        )}
        {type === 'password' && showPassword && (
          <Button onClick={() => setIcon(icon === 'eye-open' ? 'eye-close' : 'eye-open')} icon={icon} type="icon" />
        )}
      </div>
    </div>
  );
});

Input.defaultProps = {
  showClear: false,
  type: 'text',
  showPassword: true,
};

