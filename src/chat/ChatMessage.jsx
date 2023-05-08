import React from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Modal } from '@/components'
import { CopyIcon, ScrollView, Error, EmptyChat, ChatHelp } from './component'
import { MessageRender } from './MessageRender'
import { useGlobal } from './context'
import { useMesssage, useSendKey, useOptions } from './hooks'
import { dateFormat } from './utils'
import avatar from '@/assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'

export function MessageHeader() {
  const { is, setIs, clearMessage, options } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  const { setGeneral } = useOptions()

  return (
    <div className={classnames(styles.header)}>
      <Button type="icon" icon={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className={styles.header_title}>
        {message?.title}
        <div className={styles.length}>{messages.length} messages</div>
      </div>
      <div className={styles.header_bar}>
        <Icon className={styles.icon} type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} />
        <Icon className={styles.icon} type="clear" onClick={clearMessage} />
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
                <Icon className={styles.icon} type="reload" />
                <Icon className={styles.icon} type="editor" />
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
  const { sendMessage, setMessage, is, options, setIs, typeingMessage, clearTypeing, stopResonse } = useGlobal()
  useSendKey(sendMessage, options.general.command)
  return (
    <div className={styles.bar}>
      {is.thinking && <div className={styles.bar_tool}>
        <div className={styles.bar_loading}>
          <div className="flex-c"><span>Thinking</span> <Loading /></div><Button size="min" className={styles.stop} onClick={stopResonse} icon="stop">Stop Resonse</Button>
        </div>
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

export function MessageContainer() {
  const { options } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  if (options?.openai?.apiKey) {
    return (
      <React.Fragment>
        {
          messages.length ? <div className={styles.container}>
            {messages.map((item, index) => <MessageItem key={index} {...item} />)}
            {message?.error && <Error />}
          </div> : <ChatHelp />
        }
      </React.Fragment>
    )
  } else {
    return <EmptyChat />
  }
}

export function ChatMessage() {
  const { is, options } = useGlobal()
  return (
    <React.Fragment>
      <div className={styles.message}>
        <MessageHeader />
        <ScrollView>
          <MessageContainer />
          {is.thinking && <Loading />}
        </ScrollView>
        <MessageBar />
      </div>
      {/* <Modal title="New con" visible={showModal} /> */}
    </React.Fragment >
  )
}

