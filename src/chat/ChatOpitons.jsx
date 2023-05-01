import React from 'react'
import { Button, Switch, Panel, Input, Title, Avatar } from '@/components'
import { useGlobal } from './context'

export function ConfigHeader() {
  const { setIs, is } = useGlobal()
  return (
    <div className='flex-c-sb z-chat-config__header'>
      <Title type="h5">Setting</Title>
      <div>
        <Button type="icon" onClick={() => setIs({ config: !is.config })} icon="close" />
      </div>
    </div>
  )
}

export function ChatOpitons() {
  const { options } = useGlobal()
  const { account, model, general } = options || {}
  const { avatar, name } = account || {}
  const { theme, language, sendCommand } = general || {}
  const { max_tokens, apiKey, temperature, baseUrl, organizationId, top_p } = model || {}

  return (
    <div className='flex-c-sb z-chat-config flex-column'>
      <ConfigHeader />
      <div className='z-chat-config__inner flex-1'>
        <Title type="h5">Account</Title>
        <Panel className="panel">
          <Panel.Item title="avatar" desc="If selected,  will switch between different appearances following your system settings" icon="user">
            <Avatar src={avatar} />
          </Panel.Item>
          <Panel.Item icon="setting" title="Personalized Name" desc="Personalize your AI pair programmer. You can rename your assistant to anything you responsibly prefer.">
            <Input value={name} placeholder="Personalize your AI pair programmer" />
          </Panel.Item>
        </Panel>
        <Title type="h5">General</Title>
        <Panel className="panel">
          <Panel.Item title="Appearance" desc="If selected,  will switch between different appearances following your system settings" icon="config">
            <Switch label={theme} />
          </Panel.Item>
          <Panel.Item icon="light" title="Theme Style" desc="Select interface style">
            <Input value={theme} placeholder="Select interface style" />
          </Panel.Item>
          <Panel.Item icon="files" title="Send messages" desc="Want to make this keyboard shortcut a global one?">
            <Input value={sendCommand} placeholder="OpenAI ApiKey" />
          </Panel.Item>
          <Panel.Item icon="lang" title="Language" desc="Select interface language">
            <Input value={language} placeholder="OpenAI ApiKey" />
          </Panel.Item>
        </Panel>
        <Title type="h5">Global OpenAI Config</Title>
        <Panel className="panel">
          <Panel.Item title="ApiKey" desc="Select interface style" icon="key">
            <Input value={apiKey} placeholder="ApiKey" type="password" />
          </Panel.Item>
          <Panel.Item icon="model" title="Default language" desc="Custom gpt model for OpenAI API.">
            <Input value={model} placeholder="Choose Language" />
          </Panel.Item>
          <Panel.Item icon="organization" title="Organization" desc="OpenAI Organization ID. Documentation.">
            <Input value={organizationId} placeholder="OpenAI Organization ID" />
          </Panel.Item>
          <Panel.Item icon="paste" title="Temperature" desc="What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications">
            <Input value={temperature} placeholder="OpenAI Temperature" />
          </Panel.Item>
          <Panel.Item icon="files" title="Max Tokens" desc="The maximum number of tokens to generate in the completion.">
            <Input value={max_tokens} placeholder="Max Tokens" />
          </Panel.Item>
          <Panel.Item icon="link" title="Api Base Url" desc="Custom base url for OpenAI API.">
            <Input value={baseUrl} placeholder="Api Base Url" />
          </Panel.Item>
          <Panel.Item icon="link" title="Top P" desc="Custom base url for OpenAI API.">
            <Input value={top_p} placeholder="Api Base Url" />
          </Panel.Item>
        </Panel>
      </div>
    </div>
  )
}
