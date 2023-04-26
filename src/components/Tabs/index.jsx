import React, { useState } from 'react'
import "./style.less"

function Panel({ children }) {
  return <div className='tabs-panel'>{children}</div>
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
    <div className='tabs'>
      <div className='flex-c tabs-header'>
        {tabs.map((child, index) => (
          <div
            key={index}
            onClick={(e) => handleTabsChange(e, index)}
            className={index === active ? 'item active' : 'item'}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className='tabs-container'>
        {tabs[active]}
      </div>
    </div >
  )
}

Tabs.Panel = Panel
export { Tabs }