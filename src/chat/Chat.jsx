import React from 'react'
import { useGlobal } from './context'
import { ChatMessage } from './ChatMessage'
import { ChatSideBar } from './ChatSideBar'
import { ChatOpitons } from './ChatOpitons'
import { ChatList } from './ChatList'

export default function Chat() {
  const { is } = useGlobal()
  return (
    <div className={`z-chat flex ${is.fullScreen ? 'full' : 'normal'}`}>
      <ChatSideBar />
      {is.config ? <ChatOpitons /> : <React.Fragment>{is.sidebar && <ChatList />}<ChatMessage /></React.Fragment>}
    </div>
  )
}
