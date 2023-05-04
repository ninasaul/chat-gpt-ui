import React, { useState } from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Modal } from '@/components'
import { CopyIcon, ScrollView, Error } from './component'
import { MessageRender } from './MessageRender'
import { useGlobal } from './context'
import { useMesssage } from './hooks'
import { dateFormat } from './utils'
import avatar from '@/assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'

export function MessageHeader() {
  const { is, setIs } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  console.log(styles)
  return (
    <div className={classnames(styles.header)}>
      <Button type="icon" icon={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className={styles.header_title}>
        {message?.title}
        <div className={styles.length}>{messages.header_length} messages</div>
      </div>
      <div className={styles.header_bar}>
        <Icon type="download" className={styles.icon} />
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
  const { removeMessage } = useGlobal()
  return (
    <div className={classnames(styles.item, styles[role])}>
      <Avatar src={role !== 'user' && avatar} />
      <div className={classnames(styles.item_content, styles[`item_${role}`])}>
        <div className={styles.item_inner}>
          <div className={styles.item_tool}>
            <div className={styles.item_date}>{dateFormat(sentTime)}</div>
            <div className={styles.item_bar}>
              <Tooltip text="Remove Messages">
                <Icon className={styles.icon} type="trash" onClick={removeMessage} />
              </Tooltip>
              {role === 'user' ? <React.Fragment>
                <Tooltip text="reload">
                  <Icon className={styles.icon} type="reload" />
                </Tooltip>
                <Tooltip text="Editor Conversations">
                  <Icon className={styles.icon} type="editor" /></Tooltip>
              </React.Fragment> : <CopyIcon value={content} />}
            </div>
          </div>
          <MessageRender>
            {content}
          </MessageRender>
        </div>
      </div>
    </div>
  )
}

export function MessageBar() {
  const { sendMessage, setMessage, is, setIs, typeingMessage, clearTypeing, stopResonse } = useGlobal()
  return (
    <div className={styles.bar}>
      {is.thinking && <div className={styles.bar_tool}>
        <Button className={styles.stop} onClick={stopResonse} icon="stop">Stop Resonse</Button>
      </div>}
      <div className={styles.bar_inner}>
        <div className={styles.bar_type}>
          <Textarea transparent={true} rows="3" value={typeingMessage?.content || ''} onFocus={() => setIs({ inputing: true })} onBlur={() => setIs({ inputing: false })} placeholder="Enter somthing...." onChange={setMessage} />
        </div>
        <div className={styles.bar_icon}>
          {typeingMessage?.content &&
            <Tooltip text="clear">
              <Icon className={styles.icon} type="cancel" onClick={clearTypeing} />
            </Tooltip>}
          <Tooltip text="history">
            <Icon className={styles.icon} type="history" />
          </Tooltip>
          <Icon className={styles.icon} type="send" onClick={sendMessage} />
        </div>
      </div>
    </div>
  )
}

export function ChatMessage() {
  const { is } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <div className={styles.message}>
        <MessageHeader />
        <ScrollView>
          <div className={styles.container}>
            {messages.map((item, index) => <MessageItem key={index} {...item} />)}
            {message?.error && <Error />}
          </div>
          {is.thinking && <Loading />}
        </ScrollView>
        <MessageBar />
      </div>
      <Modal title="New con" visible={showModal} />
    </React.Fragment>
  )
}

