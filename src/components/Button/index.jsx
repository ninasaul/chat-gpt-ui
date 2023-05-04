import React, { forwardRef } from 'react'
import styles from "./button.module.less"
import { classnames } from "../utils"

export const Button = forwardRef((props, ref) => {
  const { className, size, ghost, icon, type, children, ...rest } = props
  return (
    <button className={classnames(styles.button, size && styles.size, icon && styles.icon, type && styles.type, ghost && styles.ghost)} ref={ref} {...rest} >
      {icon && <i className={`ico ico-${icon}`} />}
      {children}
    </button>
  )
})

Button.defaultProps = {
  ghost: false,
  size: 'normal',
  icon: ''
}
