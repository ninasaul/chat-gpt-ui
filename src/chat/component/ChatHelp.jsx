import React from 'react'
import styles from './style.module'
import EmptyImg from './EmptyImg'

export function ChatHelp() {
  return (
    <div className={styles.help}>
      <EmptyImg />
      <h2>Help is Jock</h2>
    </div>
  )
}
