import React from 'react'
import styles from "./tag.module.less"
import { classnames } from '../utils'

export function Tag({ children, ghost }) {
  return (
    <div className={classnames(styles.tag, ghost && styles.ghost)}>{children}</div>
  )
}

Tag.defaultProps = {
  gohost: false
}
