import React from 'react'
import { classnames } from '../utils'
import { Icon } from '../Icon'
import { Title } from '../Title'
import styles from './panel.module'

import PropTypes from 'prop-types'
export function Item(props) {
  const { type, title, desc, children, extra, icon, className } = props

  return (
    <div className={classnames(styles.item, type && styles[type], className)}>
      <div className={styles.headers}>
        <div className={styles.container}>
          {icon && <Icon className={styles.icon} type={icon} />}
          <div className={styles.line}>
            <div className={styles.item_title}>{title}</div>
            <div className={styles.item_desc}>{desc}</div>
          </div>
        </div>
        {extra}
      </div>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  )
}

export function Panel(props) {
  const { children, title, className } = props
  return (
    <div className={classnames(styles.panel, className)}>
      {title && <Title type="h4" className={styles.title}>{title}</Title>}
      <div className={styles.children}>{children}</div>
    </div>
  )
}

Item.defaultProps = {
  type: 'vertical'
}

Panel.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  type: PropTypes.string,
}

Panel.Item = Item