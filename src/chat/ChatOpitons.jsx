import React from 'react'
import { Button, Panel, Input, Title, Avatar, Select } from '@/components'
import { useGlobal } from './context'
import { themeOptions, languageOptions, sendCommandOptions, modelOptions, sizeOptions } from './utils'
import { Tooltip } from '../components'
import styles from './style/config.module'
import { classnames } from '../components/utils'
import { useOptions } from './hooks'

export function ConfigHeader() {
  const { setIs, is } = useGlobal()
  return (
    <div className={classnames(styles.header, 'flex-c-sb')}>
      <Title type="h5">Setting</ Title>
      <div className="flex-c">
        <Tooltip text="reset options">
          <Button type="icon" onClick={() => setIs({ config: !is.config })} icon="refresh" />
        </Tooltip>
        <Button type="icon" onClick={() => setIs({ config: !is.config })} icon="close" />
      </div>
    </div >
  )
}

export function ChatOpitons() {
  const { options } = useGlobal()
  const { account, openai, general } = options || {}
  const { avatar, name } = account || {}
  const { theme, language, sendCommand, size } = general || {}
  const { max_tokens, apiKey, temperature, baseUrl, organizationId, top_p, model } = openai || {}
  const { setAccount, setGeneral, setModel } = useOptions()

  return (
    <div className={classnames(styles.config, 'flex-c-sb flex-column')}>
      <ConfigHeader />
      <div className={classnames(styles.inner, 'flex-1')}>
        <Panel className={styles.panel} title="Account">
          <Panel.Item title="avatar" desc="If selected,  will switch between different appearances following your system settings" icon="user">
            <Avatar src={avatar} />
          </Panel.Item>
          <Panel.Item icon="setting" title="Personalized Name" desc="Personalize your AI pair programmer. You can rename your assistant to anything you responsibly prefer.">
            <Input value={name} onChange={(val) => setAccount({ name: val })} placeholder="Personalize your AI pair programmer" />
          </Panel.Item>
        </Panel>
        <Panel className={styles.panel} title="General">
          {/* <Panel.Item title="Appearance" desc="If selected,  will switch between different appearances following your system settings" icon="config">
            <Switch label={theme} />
          </Panel.Item> */}
          <Panel.Item icon="light" title="Theme Style" desc="Select interface style">
            <Select onChange={(val) => setGeneral({ theme: val })} value={theme} options={themeOptions} placeholder="Select interface style" />
          </Panel.Item>
          <Panel.Item icon="files" title="Send messages" desc="Want to make this keyboard shortcut a global one?">
            <Select onChange={(val) => setGeneral({ sendCommand: val })} value={sendCommand} options={sendCommandOptions} placeholder="Select interface style" />
          </Panel.Item>
          <Panel.Item icon="lang" title="Language" desc="Select interface language">
            <Select value={language} onChange={val => setGeneral({ language: val })} options={languageOptions} placeholder="OpenAI ApiKey" />
          </Panel.Item>
          <Panel.Item icon="config" title="FontSize" desc="userFace font size">
            <Select value={size} onChange={val => setGeneral({ size: val })} options={sizeOptions} placeholder="OpenAI ApiKey" />
          </Panel.Item>
        </Panel>
        <Panel className={styles.panel} title="Global OpenAI Config">
          <Panel.Item title="API Key" desc="Custom openai.com API Key" icon="key">
            <Input value={apiKey} onChange={val => setModel({ apiKey: val })} placeholder="ApiKey" type="password" />
          </Panel.Item>
          <Panel.Item icon="model" title="OpenAI model" desc="Custom gpt model for OpenAI API.">
            <Select options={modelOptions} value={model} onChange={val => setModel({ model: val })} placeholder="Choose models" />
          </Panel.Item>
          <Panel.Item icon="organization" title="Organization" desc="OpenAI Organization ID. Documentation.">
            <Input value={organizationId} placeholder="OpenAI Organization ID" onChange={val => setModel({ organizationId: val })} />
          </Panel.Item>
          <Panel.Item icon="paste" title="Temperature" desc="What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications">
            <Input type="number" value={temperature} placeholder="OpenAI Temperature" onChange={val => setModel({ temperature: +val })} />
          </Panel.Item>
          <Panel.Item icon="files" title="Max Tokens" desc="The maximum number of tokens to generate in the completion.">
            <Input type="number" value={max_tokens} placeholder="Max Tokens" onChange={val => setModel({ max_tokens: +val })} />
          </Panel.Item>
          <Panel.Item icon="link" title="Api Base Url" desc="Custom base url for OpenAI API.">
            <Input value={baseUrl} placeholder="Api Base Url" onChange={val => setModel({ baseUrl: val })} />
          </Panel.Item>
          <Panel.Item icon="link" title="Top P" desc="Custom top_p.">
            <Input type="number" value={top_p} placeholder="Custom top_p." onChange={val => setModel({ top_p: +val })} />
          </Panel.Item>
        </Panel>
      </div>
    </div>
  )
}
