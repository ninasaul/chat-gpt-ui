import React, { forwardRef } from 'react'
import styles from "./button.module.less"
import { classnames } from "../utils"
import PropTypes from 'prop-types'

export const Button = forwardRef((props, ref) => {
  const { className, style, size, ghost, icon, type, children, ...rest } = props
  return (
    <button className={classnames(styles.button, size && styles[size], type === "icon" && styles.ico, type && styles[type], ghost && styles.ghost, className)} ref={ref} {...rest} >
      {icon && <i className={`${styles.ico} ico-${icon}`} />}
      {children}
    </button>
  )
})

Button.defaultProps = {
  ghost: false,
  size: 'normal',
  icon: '',
  type: 'normal',
  style: {}
}

Button.propTypes = {
  ghost: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
}
