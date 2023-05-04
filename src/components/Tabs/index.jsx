import React, { useState } from 'react'
import styles from './tabs.module.less'
import { classnames } from '../utils';

function Panel({ children }) {
  return <div className={styles.panel}>{children}</div>
}

function Tabs({ children, tabsChange }) {
  const [active, setActive] = useState(0);
  {
    React.Children.forEach(children, (child) => {
      if (child.type?.name && child.type?.name !== 'Panel') {
        console.warn('Invalid child component:', child.type);
        return false
      }
    });
  }
  const handleTabsChange = (e, index) => {
    setActive(index)
    tabsChange && tabsChange(index, e)
  }
  const tabs = React.Children.toArray(children).filter(child => child.type === Panel);
  return (
    <div className={styles.tabs}>
      <div className={styles.headers}>
        {tabs.map((child, index) => (
          <div
            key={index}
            onClick={(e) => handleTabsChange(e, index)}
            className={classnames(styles.item, index === active ? 'active' : '')}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        {tabs[active]}
      </div>
    </div >
  )
}

Tabs.Panel = Panel
export { Tabs }