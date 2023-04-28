import React, { useState, useEffect } from 'react';
import './style.less';
import { setClassName } from '../utils';


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
    <div className={setClassName({
      name: 'range',
      single: ['flex-c'],
      className
    })}>
      <div className='flex-1'>
        <input ref={ref} type="range" min={min} max={max}  {...rest} value={val} onChange={handleChange} />
      </div>
      <div className={
        setClassName({
          name: 'range-value',
        })
      }> {val}</div>
    </div>
  );
})

Range.defaultProps = {
  min: 0,
  max: 100,
  value: 0
}
