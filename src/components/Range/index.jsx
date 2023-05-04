import React, { useState, useEffect } from 'react';
import styles from './range.module.less';
import { classnames } from '../utils';


export const Range = React.forwardRef((props, ref) => {
  const [val, setVal] = useState(0);
  const { className, max, min, value = '', onChange, ...rest } = props
  const handleChange = (event) => {
    setVal(event.target.value)
    onChange && onChange(event.target.value);
  };

  useEffect(() => {
    setVal(value)
  }, [value])
  return (
    <div className={classnames(styles.range)}>
      <div className='flex-1'>
        <input ref={ref} type="range" min={min} max={max}  {...rest} value={val} onChange={handleChange} />
      </div>
      <div className={styles.value}> {val}</div>
    </div>
  );
})

Range.defaultProps = {
  min: 0,
  max: 100,
  value: 0
}
