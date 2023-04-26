import React, { forwardRef, useMemo } from 'react'
import { setClassName } from '../utils'

export const Ui = forwardRef((props, ref) => {
  const { children, ...rest } = props
  const memoizedChildren = useMemo(() => children, [children]);
  return (
    <div ref={ref} {...rest} className={setClassName({ ...rest })} > {memoizedChildren}</div >
  )
})
