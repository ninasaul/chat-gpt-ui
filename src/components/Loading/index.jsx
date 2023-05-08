import React from 'react'
import { classnames } from '../utils'
import styles from "./loading.module.less"

export function Loading(props) {
  const { text, type, color } = props

  return (
    <div className={classnames(styles.loading)}>
      <div className={classnames(styles.n, styles[type])}>
        <div className={classnames(styles.line)}>
          {[1, 2, 3, 4].map(item => <div key={item} className={classnames(styles.bar, styles[`bar-${item}`])} style={{ backgroundColor: color }} />)}
        </div>
        {text && <div className={styles.text} v-if="text">{text}</div>}
      </div>
    </div>
  )
}

Loading.defaultProps = {
  type: 'circle', // normal|circle
  text: null
}