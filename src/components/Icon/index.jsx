import React, { forwardRef } from 'react'
import "./style.less"

export const Icon = forwardRef((props, ref) => {
  const { type, className, children, ...rest } = props
  return <div ref={ref} {...rest} className={`z-icon icon ico-${type} ${className}`} >{children}</div>
})