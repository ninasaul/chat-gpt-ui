import React from 'react'
import styles from './logo.module.less'
import { classnames } from '../utils'

export function Logo(props) {
  const { logo } = props
  return <h1 className={classnames(styles.styles, 'flex-c')}>
    <img className='logo-img' alt="FIN-GPT" src={logo} />
    <span>FIN-GPT</span>
  </h1>
}
