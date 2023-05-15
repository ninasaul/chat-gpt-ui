import React from 'react'
import { useGlobal, useMessages } from './context'

export function ChatHistory() {
  const { message } = useMessages()
  return (
    <div>
      {
        message.messages.map(item =>
          <div>
            {item.content}
          </div>
        )
      }
    </div>
  )
}
