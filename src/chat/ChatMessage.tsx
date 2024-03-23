import React from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Popover } from '../components'
import { CopyIcon, ScrollView, Error, EmptyChat, ChatHelp } from './component'
import { MessageRender } from './MessageRender'
import { ConfigInfo } from './ConfigInfo'
import { useGlobal } from './context'
import { useSendKey } from './hooks/useSendKey'
import { useOptions } from './hooks/useOptions'
import { useMessage } from './hooks/useMessage'
import { dateFormat } from './utils'
import avatar from '../assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'
import { useTranslation } from "react-i18next";

export function MessageHeader() {
  const { is, setIs, clearMessage, options } = useGlobal()
  const { message } = useMessage()
  const messages = message.messages;
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  const { setGeneral } = useOptions()
  const { t } = useTranslation();

  return (
    <div className={classnames(styles.header)}>
      <Button type="icon" icon={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className={styles.header_title}>
        {message?.title}
        <div className={styles.length}>{t('count_messages', { count: messages.length })}</div>
      </div>
      <div className={styles.header_bar}>
        <Icon className={styles.icon} type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} />
        <Icon className={styles.icon} type="clear" onClick={clearMessage} />
        <Popover position="bottom" content={<ConfigInfo />}>
          <Icon className={styles.icon} type="more" />
        </Popover>
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
  const { content, sentTime, role, id } = props
  const { removeMessage, editMessage, user } = useGlobal()
  const { t } = useTranslation();

  return (
    <div className={classnames(styles.item, styles[role])}>
      <Avatar src={role === 'user' ? user?.avatar : avatar} />
      <div className={classnames(styles.item_content, styles[`item_${role}`])}>
        <div className={styles.item_inner}>
          <div className={styles.item_tool}>
            <div className={styles.item_date}>{dateFormat(sentTime)}</div>
            <div className={styles.item_bar}>
              <Tooltip text={t("Remove Message")}>
                <Icon className={styles.icon} type="trash" onClick={() => removeMessage(id)} />
              </Tooltip>
              {role === 'user' ? <React.Fragment>
                {false && <Icon className={styles.icon} type="reload" />}
                <Icon className={styles.icon} type="editor" onClick={() => editMessage(id)} />
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
  const { t } = useTranslation();
  useSendKey(sendMessage, options.general.sendCommand)
  return (
    <div className={styles.bar}>
      {is.thinking && <div className={styles.bar_tool}>
        <div className={styles.bar_loading}>
          <div className="flex-c"><span>Thinking</span> <Loading /></div><Button size="min" className={styles.stop} onClick={stopResonse} icon="stop">Stop Resonse</Button>
        </div>
      </div>}
      <div className={styles.bar_inner}>
        <div className={styles.bar_type}>
          <Textarea transparent={true} rows="3" value={typeingMessage?.content || ''}
            onFocus={() => setIs({ inputing: true })} onBlur={() => setIs({ inputing: false })}
            placeholder={t("Enter something....")} onChange={setMessage} onEnter={onEnter} />
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

const onEnter = (content, event) => {

  //sendMessage(content)
}

export function MessageContainer() {
  const { options } = useGlobal()
  const { message } = useMessage()
  const { messages = [] } = message || {}
  if (options?.openai?.apiKey) {
    return (
      <React.Fragment>
        {
          messages.length ? <div className={styles.container}>
            {messages
              .filter(message => message.role === "user" || message.role === "assistant")
              .map((item, index) => <MessageItem key={item.id} {...item} />)}
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
  const { is } = useGlobal()
  return (
    <div className={styles.message}>
      <MessageHeader />
      <ScrollView>
        <MessageContainer />
        {is.thinking && <Loading />}
      </ScrollView>
      <MessageBar />
    </div>
  )
}

