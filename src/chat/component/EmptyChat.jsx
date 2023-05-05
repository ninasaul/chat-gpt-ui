import React, { useState } from 'react'
import { Input } from '@/components'
import styles from './style.module'
import { useOptions } from '../hooks'
import EmptyImg from './EmptyImg'

export function EmptyChat() {
  const { setModel } = useOptions()
  const [apiKey, setApiKey] = useState(null);
  return (
    <div className={styles.empty}>
      <EmptyImg />
      <div className={styles.empty_inner}>
        <Input onChange={setApiKey} placeholder="OpenAI API key" className={styles.empty_input} />
        <Button onClick={setModel({ apiKey })}>Save</Button>
      </div>
      <div className={styles.empty_text}>API key is stored locally. Create one on OpenAI</div>
    </div>
  )
}
