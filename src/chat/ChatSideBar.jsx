import React from 'react'
import { Avatar, Icon, Tooltip } from '../components'
import { useGlobal } from './context'
import styles from './style/sider.module.less'
import { classnames } from '../components/utils'
import { useOptions } from './hooks'

const Option = (props) => {
  const { type, onClick, tooltip } = props
  return (
    <Tooltip text={tooltip}><Icon className={styles.icon} type={type} onClick={onClick} /></Tooltip>
  )
}

export function ChatSideBar() {
  const { is, setState, options, user } = useGlobal()
  const { setGeneral } = useOptions()
  return (
    <div className={classnames(styles.sider, 'flex-c-sb flex-column')}>
      <Avatar src={user?.avatar || ""} />
      <div className={classnames(styles.tool, 'flex-c-sb flex-column')}>
        <Option type="apps" onClick={() => setState({ is: { ...is, apps: true } })} tooltip="Apps" />
        <Option type="history" onClick={() => setState({ is: { ...is, apps: false } })} tooltip="History" />
        <Option type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} tooltip="Theme" />
        <Option type="config" onClick={() => setState({ is: { ...is, config: !is.config } })} tooltip="Config" />
        <Option type={`${is.fullScreen ? 'min' : 'full'}-screen`} onClick={() => setState({ is: { ...is, fullScreen: !is.fullScreen } })}
          tooltip={`${is.fullScreen ? 'Minimize' : 'Maximize'}`} />
      </div>
    </div>
  )
}
