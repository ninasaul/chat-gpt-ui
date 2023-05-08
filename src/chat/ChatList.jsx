import React from 'react'
import { Icon, Title } from '@/components'
import { useGlobal } from './context'
import { ScrollView } from './component'
import { classnames } from '../components/utils'
import styles from './style/list.module'
import { Search } from '../components'

export function ListEmpty() {
  return (
    <div className={classnames('flex-column')}>
      <Icon type="message" />
      <Title type="h3">No conversations found<br />Start a new conversation to begin storing them locally.</Title>
    </div>
  )
}
export function ListTool(props) {
  const { removeChat } = useGlobal()
  return (
    <div className={styles.tool}>
      {/* <Icon className={styles.icon} type="editor" /> */}
      <Icon className={styles.icon} type="close" onClick={() => removeChat(props.index)} />
    </div>
  )
}

export function CreateNew() {
  const { newChat } = useGlobal()
  return <div className={styles.new} onClick={newChat}><Icon type="add" />New Conversations</div>
}

export function ChatItem(props) {
  const { setState, currentChat } = useGlobal()
  return (
    <div className={classnames(styles.item, currentChat === props.index && styles.current)} onClick={() => setState({ currentChat: props.index })} >
      <Icon type="translation-full" />
      <div className={styles.title}>
        <div className={styles.title_item}>
          <div className={styles.title_p}>{props.title}</div>
        </div>
        <div className={styles.message}>{props.messages.length} messages</div>
      </div>
      <ListTool index={props.index} />
    </div>
  )
}

export function ChatList() {
  const { chat } = useGlobal()
  return (
    <div className={styles.list}>
      {chat.length ? chat.map((item, index) => <ChatItem key={index} index={index} {...item} />) : <ListEmpty />}
      <CreateNew />
    </div>
  )
}
