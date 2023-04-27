import React from 'react'
import { Icon, Button } from '@/components'
import { useGlobal } from './context'
import { ScrollView } from './component'

export function CreateNew() {
  const { newChat } = useGlobal()
  return <div className='z-chat-message__new flex-c' onClick={newChat}><Icon type="add" />New Chat</div>
}

export function ChatItem(props) {
  const { setState, currentChat } = useGlobal()
  return (
    <div className={`z-chat-list__item ${currentChat === props.index ? 'current' : ''}`} onClick={() => setState({ currentChat: props.index })} >
      <div className='title'>{props.title}</div>
      <div className='flex-c-sb bar'><div>{props.messages.length} messages</div> {props.ct}</div>
    </div>
  )
}

export function ChatList() {
  const { chat } = useGlobal()
  return (
    <div className='z-chat-list flex-c-sb flex-column'>
      <ScrollView>
        {chat.length ? chat.map((item, index) => <ChatItem key={item.id} index={index} {...item} />) : null}
      </ScrollView>
      <CreateNew />
    </div>
  )
}
