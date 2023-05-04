import React from 'react'
import { Avatar, Icon, Tooltip } from '../components'
import { useGlobal } from './context'
import styles from './style/sider.module'
import { classnames } from '../components/utils'
import { useOptions } from './hooks'

export function ChatSideBar() {
  const { is, setState, setOptions, options } = useGlobal()
  const { setGeneral } = useOptions()
  return (
    <div className={classnames(styles.sider, 'flex-c-sb flex-column')}>
      <Avatar />
      <div className={classnames(styles.tool, 'flex-c-sb flex-column')}>
        <Tooltip text="toggle Theme" position="right">
          <Icon className={styles.icon} type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} />
        </Tooltip>
        <Tooltip text="Settings" position="right">
          <Icon className={styles.icon} type="config" onClick={() => setState({ is: { ...is, config: !is.config } })} />
        </Tooltip>
        <Tooltip text="full Screen" position="right">
          <Icon className={styles.icon} type={`${is.fullScreen ? 'min' : 'full'}-screen`} onClick={() => setState({ is: { ...is, fullScreen: !is.fullScreen } })} />
        </Tooltip>
      </div>
    </div>
  )
}
