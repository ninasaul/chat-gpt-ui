import React from 'react'
import { Icon, Button, Range } from '@/components'
import { useGlobal } from './context'
import { ScrollView } from './component'

export function ListTool(props) {
  const { removeChat } = useGlobal()
  return (
    <div className='flex-c z-chat-list__tool'>
      {/* <Button type="icon" icon="editor" /> */}
      <Button type="icon" onClick={() => removeChat(props.index)} icon="close" />
    </div>
  )
}

export function CreateNew() {
  const { newChat } = useGlobal()
  return <Button onClick={newChat}><Icon type="add" />New Conversations</Button>
}

export function ChatItem(props) {
  const { setState, currentChat } = useGlobal()
  return (
    <div className={`z-chat-list__item ${currentChat === props.index ? 'current' : ''}`} onClick={() => setState({ currentChat: props.index })} >
      <div className='title'>{props.title}</div>
      <div className='flex-c-sb bar'>
        <div>{props.messages.length} messages</div>
        <ListTool index={props.index} />
      </div>
    </div>
  )
}

export function ChatList() {
  const { chat } = useGlobal()
  return (
    <div className='z-chat-list flex-c-sb flex-column'>
      <ScrollView>
        {chat.length ? chat.map((item, index) => <ChatItem key={index} index={index} {...item} />) : null}
      </ScrollView>
      <CreateNew />
    </div>
  )
}
