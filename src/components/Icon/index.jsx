import React, { forwardRef } from 'react'
import styles from "./icon.module.less"
import { classnames } from '../utils'

export const Icon = forwardRef((props, ref) => {
  const { type, children, className, ...rest } = props
  return <i ref={ref} {...rest} className={classnames(styles.icon, `ico ico-${type}`, className)} >{children}</i>
})