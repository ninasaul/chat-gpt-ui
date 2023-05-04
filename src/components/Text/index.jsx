import React from 'react'
import { classnames } from '../utils'
import styles from "./text.module.less"

export const Text = ({ children, type }) => {

  return (
    <div className={classnames(styles.text, sytles[type])}>{children}</div>
  )
}

Text.defaultProps = {
  type: 'normal'
}
