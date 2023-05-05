import React from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatSideBar } from './ChatSideBar'
import { ChatOpitons } from './ChatOpitons'
import { ChatList } from './ChatList'
import { classnames } from '../components/utils'
import { useGlobal } from './context'
import styles from './style/chat.module.less'
import './style.less'

export default function Chat() {
  const { is } = useGlobal()
  const chatStyle = is.fullScreen ? styles.full : styles.normal
  return (
    <div className={classnames(styles.chat, chatStyle)}>
      <ChatSideBar />
      {is.config ? <ChatOpitons /> : <React.Fragment>{is.sidebar && <ChatList />}<ChatMessage /></React.Fragment>}
    </div>
  )
}
