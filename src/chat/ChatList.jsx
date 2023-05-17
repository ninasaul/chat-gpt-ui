import React, { useRef, useState } from 'react'
import { Icon, Title, Textarea, Popover, Button } from '@/components'
import { useGlobal } from './context'
import { classnames } from '../components/utils'
import styles from './style/list.module'

export function ListEmpty() {
  return (
    <div className={classnames('flex-column')}>
      <Icon type="message" />
      <Title type="h3">No conversations found<br />Start a new conversation to begin storing them locally.</Title>
    </div>
  )
}

export function ListTool(props) {
  const { removeChat, setState } = useGlobal()
  return (
    <div className={styles.tool}>
      <Icon className={styles.icon} type="editor" onClick={() => setState({ currentEditor: props.index })} />
      <Icon className={styles.icon} type="close" onClick={() => removeChat(props.index)} />
    </div>
  )
}

export function CreateNew() {
  const { newChat } = useGlobal()
  return <div className={styles.new} onClick={newChat}><Icon type="add" />New Conversations</div>
}

export function ColorIcon({ onChange }) {
  const [color, setColor] = useState(1);
  const [ico, setIco] = useState("files");
  const icoRef = useRef(null)
  const iconList = ["files", "scan-text", "message", "translation", "lab", "recommendations", "prompts", "productivity", "game", "engineers", "finance", "social-media", "designers", "programming", "write", "assistants", "education", "shark", "legal", "tape", "ui", "models", "mathematics", "science", "stopwatch"]
  function handleSelectColor(colors, icos) {
    colors && setColor(colors)
    icos && setIco(icos)
    onChange && onChange([color, ico])
  }
  const content = (
    <div className={styles.tip}>
      <div className={styles.colors}>
        <div className={styles.colors_box}>
          {new Array(15).fill(1).map((_, index) =>
            <div
              style={{ backgroundColor: `var(--tag-color-${index})` }}
              key={index}
              onClick={() => handleSelectColor(index)}
              className={classnames(styles.colors_item, styles[`color-${index}`], color === index ? styles.colors_currColor : null)} />
          )}
        </div>
        <div className={styles.colors_box}>
          {iconList.map((item) =>
            <div
              onClick={() => handleSelectColor(null, item)}
              key={item}
              style={{ backgroundColor: ico === item && `var(--tag-color-${color})` }}
              className={classnames(styles.colors_item, `ico-${item}`, ico === item ? styles.colors_currIco : null)} />
          )}
        </div>
      </div>
    </div>
  )
  return (
    <Popover content={content}>
      <TagIco ico={ico} color={color} ref={icoRef} />
    </Popover>
  )
}

export const TagIco = React.forwardRef(({ ico, color, ...rest }, ref) => <div ref={ref} {...rest} className={classnames(styles.colors_item, `ico-${ico}`)} style={{ color: '#fff', backgroundColor: `var(--tag-color-${color})` }} />)

export function EditItem(props) {
  const { modifyChat } = useGlobal()
  const [title, setVal] = useState(props.title);
  const [icon, setIcon] = useState(props.icon);
  return (
    <div className={styles.editor_box}>
      <h2 className={styles.editor_title}>  <ColorIcon onChange={setIcon} />Edit Conversations </h2>
      <div className={classnames(styles.editor)}>
        <Textarea rows={3} className={styles.editor_text} value={title} onChange={value => setVal(value)} />
      </div>
      <div className={styles.editor_bar}>
        <Button onClick={() => modifyChat({ title, icon }, props.index)} block={true} type="primary">Save Conversations</Button>
      </div>
    </div>
  )
}

export function ChatItem(props) {
  const { icon } = props
  const [color, ico] = icon || [1, 'files']
  const { setState, currentChat, currentEditor } = useGlobal()
  const item = (
    <React.Fragment>
      <TagIco ico={ico} color={color} />
      <div className={styles.title}>
        <div className={styles.title_item}>
          <div className={styles.title_p}>{props.title}</div>
        </div>
        <div className={styles.message}>{props.messages.length} messages</div>
      </div>
      <ListTool index={props.index} />
    </React.Fragment>
  )

  return (
    <div className={classnames(styles.item, currentChat === props.index && styles.current)} onClick={() => setState({ currentChat: props.index })} >
      {currentEditor === props.index ? <EditItem {...props} /> : item}
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
