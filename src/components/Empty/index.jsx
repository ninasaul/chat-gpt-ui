import React from 'react'
import './style.less'

export function Empty(props) {
  const { text, src } = props
  return (
    <div className="flex-c-c empty flex-column">
      <p><img className='empty-img' src={src} /></p>
      <h3>{text}</h3>
    </div>
  )
}
