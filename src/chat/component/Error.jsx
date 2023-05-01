import React from 'react'
import { useGlobal } from '../context'

export function Error() {
  const { currentChat, chat } = useGlobal()
  const chatError = chat[currentChat]?.error || {}
  return (
    <div className='z-chat-error'>
      {chatError.code}<br />
      {chatError.message}<br />
      {chatError.type}<br />
      {chatError.param}<br />
    </div>
  )
}
