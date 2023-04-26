import React from 'react'
import { setClassName } from '../utils'
import "./style.less"

export function Loading(props) {
  const { text, type, color } = props
  const boxClass = setClassName({
    name: 'loading',
    extra: [type]
  })
  return (
    <div className={boxClass}>
      <div className={setClassName({ name: 'loading-n' })}>
        <div className={setClassName({ name: 'loading-bar' })}>
          {[1, 2, 3, 4].map((item, index) => <div key={item} className={`line line-${index} ${type}`} style={{ backgroundColor: color }} />)}
        </div>
        {text && <div className="loading-text" v-if="text">{text}</div>}
      </div>
    </div>
  )
}

Loading.defaultProps = {
  type: 'circle', // normal|circle
  text: null
}