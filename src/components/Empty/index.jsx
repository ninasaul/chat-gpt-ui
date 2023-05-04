import React from 'react'
import styles from './empty.module.less'
import { classnames } from '../utils'

export function Empty(props) {
  const { text, src } = props
  return (
    <div className={classnames(styles.empty)}>
      <p><img className='empty-img' src={src} /></p>
      <h3>{text}</h3>
    </div>
  )
}
