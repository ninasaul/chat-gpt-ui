import React from 'react'
import "./style.less"

export function Tag({ children, ghost }) {
  return (
    <div className={`tag ${ghost}`}>{children}</div>
  )
}

Tag.defaultProps = {
  gohost: false
}
