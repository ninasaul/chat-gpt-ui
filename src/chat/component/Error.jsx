import React from 'react'
import { useGlobal } from '../context'
import styles from './style.module.less'

export function Error() {
  const { currentChat, chat } = useGlobal()
  const chatError = chat[currentChat]?.error || {}
  console.log("Error: ", chatError)
  return (
    <div className={styles.error}>
      {chatError.code}<br />
      {chatError.message}<br />
      {chatError.type}<br />
      {chatError.param}<br />
    </div>
  )
}
