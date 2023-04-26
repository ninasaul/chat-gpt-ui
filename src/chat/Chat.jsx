import React from 'react'
import { Message } from './Message'
import { Config } from './Config'
import { ChatBar } from './ChatBar'
import { ChatList } from './ChatList'
import { useGlobal } from './context'

export default function Chat() {
  const { is } = useGlobal()
  return (
    <div className={`z-chat flex ${is.fullScreen ? 'full' : 'normal'}`}>
      <ChatBar />
      {is.config ? <Config /> : <React.Fragment>{is.sidebar && <ChatList />}<Message /></React.Fragment>}
    </div>
  )
}