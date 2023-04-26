import React, { useState, forwardRef } from 'react'
import "./style.less"

export const Switch = forwardRef((props, ref) => {
  const { label, onChange, children, ...rest } = props
  const id = `switch-${Math.floor(Math.random() * 12800)}`
  const [checked, setChecked] = useState(false);

  const toggle = ({ target: { checked } }) => {
    setChecked(checked)
    onChange && onChange(checked)
  }

  return (
    <div className="switch">
      <input {...rest} ref={ref} checked={checked} onChange={toggle} className='switch-input' type="checkbox" id={id} />
      <label className='switch-label' htmlFor={id}>
        <div className="toggle" />
        {label && <div className='switch-text'>{label}</div>}
        {children && <div className='switch-label__text'>{children}</div>}
      </label>
    </div>
  )
})
