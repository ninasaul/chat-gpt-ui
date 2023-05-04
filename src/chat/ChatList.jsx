import React from 'react'
import { Icon, Button } from '@/components'
import { useGlobal } from './context'
import { ScrollView } from './component'
import { classnames } from '../components/utils'
import styles from './style/list.module'
import { Search } from '../components'

export function ListTool(props) {
  const { removeChat } = useGlobal()
  return (
    <div className={styles.tool}>
      <Button type="icon" icon="editor" />
      <Button type="icon" onClick={() => removeChat(props.index)} icon="close" />
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
      <div className={styles.title}>{props.title}</div>
      <div className={styles.bar}>
        <div className={styles.message}>{props.messages.length} messages</div>
        <ListTool index={props.index} />
      </div>
    </div>
  )
}

export function ChatList() {
  const { chat } = useGlobal()
  return (
    <div className={styles.list}>
      <div className={styles.search}>
        <Search />
      </div>
      <ScrollView>
        {chat.length ? chat.map((item, index) => <ChatItem key={index} index={index} {...item} />) : null}
      </ScrollView>
      <CreateNew />
    </div>
  )
}
