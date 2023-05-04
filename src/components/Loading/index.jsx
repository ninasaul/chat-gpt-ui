import React from 'react'
import { classnames } from '../utils'
import styles from "./loading.module.less"

export function Loading(props) {
  const { text, type, color } = props

  return (
    <div className={styles.loading}>
      <div className={styles.n}>
        <div className={styles.bar}>
          {[1, 2, 3, 4].map((item, index) => <div key={item} className={classnames(styles.line, `line-${index}`)} style={{ backgroundColor: color }} />)}
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