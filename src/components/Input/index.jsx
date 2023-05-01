import React, { forwardRef, useState } from 'react'
import './style.less'
import { setClassName } from '../utils'
import { Button } from '../Button'
import PropTypes from 'prop-types'

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

  const handleClear = () => {
    onClear && onClear({ target: { value: '' } });
  };
  const [icon, setIcon] = useState('eye-close');

  function handleChange(event) {
    onChange && onChange(event.target.value)
  }

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
          ref={ref}
          type={icon === 'eye-open' ? 'text' : type}
          value={value}
          className={setClassName({ name: 'input-content' })}
          onChange={handleChange}
          {...rest}
        />
        {showClear && value.length && type !== 'password'(
          <Button onClick={handleClear} icon="clear" type="icon" />
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


Input.propTypes = {
  type: PropTypes.string,
  showPassword: PropTypes.bool,
  showClear: PropTypes.bool,
  className: PropTypes.string,
  extra: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  value: PropTypes.string
}
