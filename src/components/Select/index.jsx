import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { classnames } from '../utils';
import styles from "./select.module.less"

export const Select = forwardRef((props, ref) => {
  const { value, className, options, onChange, defaultValue, ...rest } = props
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const controlled = value !== undefined;

  const handleChange = (event) => {
    const value = event.target.value;
    if (!controlled) {
      setSelectedValue(value);
    }
    onChange && onChange(value);
  };

  const optionsList = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className={classnames(styles.inner)}>
      <select
        ref={ref}
        className={styles.select}
        {...rest}
        value={controlled ? props.value : selectedValue}
        onChange={handleChange}
      >
        {optionsList}
      </select>
    </div>
  );
});

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};


Select.defaultProps = {
  options: []
}