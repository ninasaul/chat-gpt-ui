import React, { forwardRef, useContext } from 'react'
import "./style.less"
import { setClassName } from "../utils"
import { UiContext } from "../context"

export const Button = forwardRef((props, ref) => {
  const { baseClass } = useContext(UiContext)
  const { className, size, ghost, icon, type, children, ...rest } = props
  const classStyle = setClassName({
    base: baseClass,
    name: 'button',
    extra: [type, ghost && 'ghost', size],
    className
  })
  return (
    <button className={classStyle} ref={ref} {...rest} >
      {icon && <i className={`ico ico-${icon}`} />}
      {children}
    </button>
  )
})

Button.defaultProps = {
  ghost: false,
  size: 'normal',
  icon: null,
  type: null
}
