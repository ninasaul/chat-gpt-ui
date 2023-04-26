import React from 'react'
import "./style.less"
import { setClassName } from '../utils'

export const Text = ({ children, type }) => {
  const classStyle = setClassName({
    name: 'text',
    extra: [type]
  })
  return (
    <div className={classStyle}>{children}</div>
  )
}

Text.defaultProps = {
  type: 'normal'
}
