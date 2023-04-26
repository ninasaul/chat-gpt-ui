import React from 'react'
import { setClassName } from '../utils'
import { Icon } from '../Icon'
import './style.less'

export function Item(props) {
  const { type, title, desc, children, extra, icon } = props
  const boxClass = setClassName({
    name: 'panel-item',
    extra: [type],
    className: 'flex-c-sb'
  })
  const headerClass = setClassName({
    name: 'panel-item_header',
    extra: [type],
    className: 'flex-c'
  })
  return (
    <div className={boxClass}>
      <div className={headerClass}>
        <div className='flex-c'>
          {icon && <Icon type={icon} />}
          <div className='flex-1'>
            <div className='title'>{title}</div>
            <div className='desc'>{desc}</div>
          </div>
        </div>
        {extra}
      </div>
      <div className='panel-item__container'>
        {children}
      </div>
    </div>
  )
}


export function Panel(props) {
  const { children, title, type, className } = props
  const styleClass = setClassName({
    name: 'panel',
    extra: [type],
    className
  })

  return (
    <div className={styleClass}>
      {title && <div>{title}</div>}
      <div>{children}</div>
    </div>
  )
}

Panel.Item = Item

Item.defaultProps = {
  type: 'vertical'
}
