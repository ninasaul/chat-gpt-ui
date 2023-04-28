import React from 'react'
import { Icon, Switch, Panel, Input, Title, Avatar } from '../components'
import { useGlobal } from './context'


export default function ConfigHeader() {
  const { setIs, is } = useGlobal()
  return (
    <div className='flex-c-sb z-chat-config__header'>
      <Title type="h2">Setting</Title>
      <div>
        <Icon onClick={() => setIs({ config: !is.config })} type="close" />
      </div>
    </div>
  )
}

export function Config() {
  const { setOptions, options } = useGlobal()
  const { account, model, general } = options
  const { avatar, name } = account
  const { theme, language, sendCommand } = general
  const { max_tokens, apiKey, temperature, baseUrl } = model
  return (
    <div className='flex-c-sb z-chat-config flex-column'>
      <ConfigHeader />
      <div className='z-chat-config__inner flex-1'>
        <Title type="h3">Account</Title>
        <Panel className="panel">
          <Panel.Item title="avatar" desc="If selected,  will switch between different appearances following your system settings" icon="user">
            <Avatar src={avatar} />
          </Panel.Item>
          <Panel.Item icon="setting" title="Personalized Name" desc="Personalize your AI pair programmer. You can rename your assistant to anything you responsibly prefer.">
            <Input value={name} placeholder="Personalize your AI pair programmer" />
          </Panel.Item>
        </Panel>
        <Title type="h3">General</Title>
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
        <Title type="h3">Global OpenAI Config</Title>
        <Panel className="panel">
          <Panel.Item title="ApiKey" desc="Select interface style" icon="key">
            <Input value={apiKey} placeholder="ApiKey" type="password" />
          </Panel.Item>
          <Panel.Item icon="model" title="Default language" desc="Select interface style">
            <Input placeholder="Choose Language" />
          </Panel.Item>
          <Panel.Item icon="organization" title="Organization" desc="OpenAI Organization ID. Documentation.">
            <Input placeholder="OpenAI Organization ID" />
          </Panel.Item>
          <Panel.Item icon="paste" title="Temperature" desc="What sampling temperature to use. Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.
It is recommended altering this or top_p but not both. Documentation
0: Get more precise answers
0.5: Get more balanced answers
0.9: Get more creative answers">
            <Input value={temperature} placeholder="OpenAI ApiKey" />
          </Panel.Item>
          <Panel.Item icon="files" title="Max Tokens" desc="If you receive an HTTP 400 Bad Request, lower your maxTokens setting to allow completion to fulfill your request .The maximum number of tokens to generate in the completion.
Choose this number carefully considering the your preferred model's allowed max number of tokens.
The token count of your prompt plus max_tokens cannot exceed the model's context length. Documentation">
            <Input value={max_tokens} placeholder="OpenAI Organization ID" />
          </Panel.Item>
          <Panel.Item icon="link" title="Api Base Url" desc="Optional override for the OpenAI API base URL. If you customize it, please make sure you have the same format. e.g. starts with https:// without a trailing slash. The completions endpoint suffix is added internally, e.g. for reference: ${apiBaseUrl}/v1/completions">
            <Input value={baseUrl} placeholder="Api Base Url" />
          </Panel.Item>
        </Panel>
      </div>
    </div>
  )
}
