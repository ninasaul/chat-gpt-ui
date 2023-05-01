import React from 'react'
import { Avatar, Icon, Textarea, Text, Loading, Tooltip, Button } from '@/components'
import { CopyIcon, ScrollView, Error } from './component'
import { MessageRender } from './MessageRender'
import { useGlobal } from './context'
import { useMesssage } from './hooks'
import { dateFormat } from './utils'

export function MessageHeader() {
  const { is, setIs } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  return (
    <div className='z-chat-message__header flex-c-sb'>
      <Button type="icon" icon={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className='flex-1 title'>
        {message?.title}
        <div className='length'>{messages.length} messages</div>
      </div>
      <div className='flex-c z-chat-message__header__icon'>
        <Icon type="download" />
      </div>
    </div>
  )
}

export function EditorMessage() {
  return (
    <div>
      <Textarea rows="3" />
    </div>)
}

export function MessageItem(props) {
  const { content, sentTime, role, } = props
  return (
    <div className={`flex z-chat-message__item ${role}`}>
      <Avatar />
      <div className='flex-1 z-chat-message__content'>
        <div className='z-chat-message__inner'>
          <div className='flex-c-sb z-chat-message__tool'>
            <div className='date'>{dateFormat(sentTime)}</div>
            <div className='flex-c'>
              {role === 'user' ? <React.Fragment>
                <Tooltip text="reload">
                  <Icon type="reload" /></Tooltip>
                <Tooltip text="Editor Conversations">
                  <Icon type="editor" /></Tooltip>
              </React.Fragment> : <CopyIcon value={content} />}
            </div>
          </div>
          <div className='z-chat-message__text'>
            <MessageRender>
              {content}
            </MessageRender>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MessageBar() {
  const { sendMessage, setMessage, setIs, typeingMessage, clearTypeing } = useGlobal()
  return (
    <div className='flex-c z-chat-message__bar__inner'>
      <div className='flex-1'>
        <Textarea rows="3" value={typeingMessage?.content || ''} onFocus={() => setIs({ inputing: true })} onBlur={() => setIs({ inputing: false })} placeholder="Enter somthing...." onChange={setMessage} />
      </div>
      <div className='flex-c z-chat-message__bar__icon'>
        {typeingMessage?.content &&
          <Tooltip text="clear">
            <Button type="icon" icon="cancel" onClose={clearTypeing} />
          </Tooltip>}
        <Tooltip text="history">
          <Button type="icon" icon="history" />
        </Tooltip>
        <Button type="icon" icon="send" onClick={sendMessage} />
      </div>
    </div>
  )
}

export function TypingQuestion() {
  const { stopResonse } = useGlobal()
  return <Button size="min" className='z-chat-button-stop' onClick={stopResonse}><Icon type="stop" />Stop Resonse</Button>
}

export function StopResponse() {
  const { stopResonse } = useGlobal()
  return <Button size="min" className='z-chat-button-stop' onClick={stopResonse}><Icon type="stop" />Stop Resonse</Button>
}

export function Thinking() {
  const { is } = useGlobal()
  return is.thinking && <Loading />
}

export function ChatMessage() {
  const { message, error } = useMesssage()
  const { messages = [] } = message || {}
  return (
    <div className=' flex-1 flex-column z-chat-message'>
      <MessageHeader />
      <ScrollView>
        <div className='z-chat-message__container'>
          {messages.map(item => <MessageItem key={item.id} {...item} />)}
          {error && <Error />}
        </div>
        <Thinking />
      </ScrollView>
      <div className='z-chat-message__bar'>
        <MessageBar />
      </div>
    </div>
  )
}
