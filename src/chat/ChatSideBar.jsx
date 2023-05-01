import React from 'react'
import { Avatar, Icon, Theme, Tooltip } from '../components'
import { useGlobal } from './context'

export function ChatSideBar() {
  const { is, setState, setGeneral } = useGlobal()
  return (
    <div className='flex-c-sb flex-column z-chat-sider'>
      <Avatar />
      <div className='flex-c flex-column z-chat-sider__tool'>
        <Tooltip text="toggle Theme" position="right">
          <Theme onChange={(theme) => setGeneral({ theme })} />
        </Tooltip>
        <Tooltip text="Settings" position="right">
          <Icon type="config" onClick={() => setState({ is: { ...is, config: !is.config } })} />
        </Tooltip>
        <Tooltip text="full Screen" position="right">
          <Icon type={`${is.fullScreen ? 'min' : 'full'}-screen`} onClick={() => setState({ is: { ...is, fullScreen: !is.fullScreen } })} />
        </Tooltip>
      </div>
    </div>
  )
}
