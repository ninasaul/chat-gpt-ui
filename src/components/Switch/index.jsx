import React, { useState, forwardRef } from 'react'
import styles from "./switch.module.less"
import { classnames } from '../utils'

export const Switch = forwardRef((props, ref) => {
  const { label, onChange, children, ...rest } = props
  const id = `switch-${Math.floor(Math.random() * 12800)}`
  const [checked, setChecked] = useState(false);

  const toggle = ({ target: { checked } }) => {
    setChecked(checked)
    onChange && onChange(checked)
  }

  return (
    <div className={classnames(styles.switch)}>
      <input {...rest} ref={ref} checked={checked} onChange={toggle} className={styles.input} type="checkbox" id={id} />
      <label className={styles.label} htmlFor={id}>
        <div className={styles.toggle} />
        {label && <div className={styles.text}>{label}</div>}
        {children && <div className={styles.children}>{children}</div>}
      </label>
    </div>
  )
})
