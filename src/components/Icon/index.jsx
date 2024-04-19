import React, { forwardRef } from 'react'
import styles from "./icon.module.less"
import { classnames } from '../utils'

export const Icon = forwardRef((props, ref) => {
  const { type, children, className, onClick, ...rest } = props
  const handleClick = (event) => {
    onClick && onClick();
    event.stopPropagation();
  }
  return <i ref={ref} {...rest} onClick={handleClick} className={classnames(styles.icon, `ico ico-${type}`, className)} >{children}</i>
})