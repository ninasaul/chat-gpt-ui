import React, { forwardRef } from 'react'
import { setClassName } from '../../components/utils'

export const ScrollView = forwardRef((props, ref) => {
  const { children, className, ...rest } = props
  return <div ref={ref} className={setClassName({ name: 'scroll-view', className })} {...rest}>{children}</div>
})
