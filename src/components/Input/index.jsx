import React, { forwardRef, useState } from 'react'
import styles from './input.module.less'
import { classnames } from '../utils'
import { Button } from '../Button'
import PropTypes from 'prop-types'

export const Input = forwardRef((props, ref) => {
  const {
    onChange,
    className,
    showClear,
    onClear,
    type,
    extra,
    size,
    showPassword,
    autoComplete,
    placeholder,
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
    <div className={classnames(styles.input, className)}>
      {extra && <div className={styles.extra}>{extra}</div>}
      <div className={styles.inner}>
        <input
          ref={ref}
          type={icon === 'eye-open' ? 'text' : type}
          autoComplete={autoComplete}
          className={classnames(styles.content, styles[size])}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      <div className={styles.before}>
        {showClear && value.length && type !== 'password'(
          <Button onClick={handleClear} icon="clear" type="icon" />
        )}
        {type === 'password' && showPassword && (
          <Button onClick={() => setIcon(icon === 'eye-open' ? 'eye-close' : 'eye-open')} icon={icon} type="icon" />
        )}
      </div>
    </div >
  );
});

Input.defaultProps = {
  showClear: false,
  type: 'text',
  size: 'default',
  showPassword: true,
  autoComplete: "off",
};


Input.propTypes = {
  type: PropTypes.string,
  showPassword: PropTypes.bool,
  showClear: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  autoComplete: PropTypes.string,
  extra: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  placeholder: PropTypes.string,
}
