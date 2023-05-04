import React from 'react'
import { classnames } from '../utils'
import styles from "./title.module.less"
export function Title({ children, className, type }) {
  const styleClass = classnames(styles.title, `${styles.title}-${type}`, className)
  if (type === 'h1') return <h1 className={styleClass}>{children}</h1>
  if (type === 'h2') return <h2 className={styleClass}>{children}</h2>
  if (type === 'h3') return <h3 className={styleClass}>{children}</h3>
  if (type === 'h4') return <h4 className={styleClass}>{children}</h4>
  if (type === 'h5') return <h5 className={styleClass}>{children}</h5>
  if (type === 'h6') return <h6 className={styleClass}>{children}</h6>
}
Title.defaultProps = {
  type: 'h1'
}
