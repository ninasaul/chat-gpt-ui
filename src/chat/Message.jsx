import React, { useEffect, useRef } from 'react'
import { Avatar, Icon, Textarea, Text, Loading, Tooltip, Button } from '@/components'
import { useGlobal } from './context'
import { CopyIcon, ScrollView, Error, MessageContent } from './component'

export function MessageHeader() {
  const { chat, currentChat, is, setIs } = useGlobal()
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  return (
    <div className='z-chat-message__header flex-c-sb'>
      <Icon type={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className='flex-1 title'>
        {chat[currentChat].title}
        <div className='length'>{chat[currentChat].messages.length} messages</div>
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

export function messageUser() {

}

export function messageAssistant() {

}

export function MessageItem(props) {
  const { message, content, sentTime, role } = props
  return (
    <div className='flex z-chat-message__item'>
      <Avatar />
      <div className='flex-1 z-chat-message__content'>
        <div className='flex-c-sb z-chat-message__tool'>
          <div className='date'>{sentTime}</div>
          <div className='flex-c'>
            {role === 'user' && <Icon type="editor" />}
            <CopyIcon value="3" />
          </div>
        </div>
        <div className='z-chat-message__text'>
          <MessageContent>
            {content || message}
          </MessageContent>
        </div>
      </div>
    </div>
  )
}

export function MessageBar() {
  const { sendMessage, setMessage, setIs, typeingMessage } = useGlobal()
  const inputChange = ({ target: { value } }) => {
    value && setMessage(value)
  }
  return (
    <div className='flex-c z-chat-message__bar__inner'>
      <div className='flex-1'>
        <Textarea value={typeingMessage?.content || ''} rows="1" wrap="soft" onFocus={() => setIs({ inputing: true })} onBlur={() => setIs({ inputing: false })} placeholder="Ask a question" onChange={inputChange} />
      </div>
      <div className='flex-c z-chat-message__bar__icon'>
        <Tooltip text="ACcouneirui">
          <Icon type="more" />
        </Tooltip>
        <Icon type="send" onClick={sendMessage} />
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

export function Typing() {
  const { is } = useGlobal()
  return is.typeing && <Loading />
}

export function Message() {
  const { chat, is, currentChat } = useGlobal()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (is.typeing) {
      window.requestAnimationFrame(handleScroll);
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [is.typeing])

  return (
    <div className=' flex-1 flex-column z-chat-message'>
      <MessageHeader />
      <ScrollView ref={messagesEndRef}>
        <div className='z-chat-message__container'>
          {chat[currentChat].messages.map((item, index) => <MessageItem key={index} {...item} />)}
        </div>
        <Typing />
        {chat[currentChat]?.error && <Error />}
      </ScrollView>
      <div className='z-chat-message__bar'>
        <MessageBar />
      </div>
    </div>
  )
}
