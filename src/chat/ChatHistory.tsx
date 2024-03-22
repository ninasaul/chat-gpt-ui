import React from 'react'
import { useMessage } from './hooks/useMessage'

export function ChatHistory() {
  const { message } = useMessage()
  return (
    <div>
      {
        message.messages.map(item =>
          <div key={item.id}>
            {item.content}
          </div>
        )
      }
    </div>
  )
}
