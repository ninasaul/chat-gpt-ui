import React from 'react'
import { AppsProvide, useApps } from './context'
import { classnames } from '@/components/utils'
import styles from './apps.module.less'
import { Search } from '../../components'

export function AppItem(props) {
  return (
    <div className={styles.app}>
      {/* <div className={classnames(styles.app_icon, `ico-prompts`)}></div> */}
      <div className={styles.app_content}>
        <div className={styles.app_title}>{props.title}</div>
        <div className={styles.app_desc}>{props.desc}</div>
      </div>
    </div>
  )
}

export function Empty() {
  return (
    <div className={classnames(styles.empty, 'flex-column')}>
      <div className={classnames(styles.icon, 'ico-prompts')} />
      <div className={styles.empty_text}>None-apps</div>
    </div>
  )
}

export function Category(props) {
  const { setState, apps, current, category } = useApps()
  const list = apps.filter(item => item.id === category[current].id)
  return (
    <div>
      <div className={classnames(styles.category, current === props.index && styles.current)} onClick={() => setState({ current: props.index })}>
        <div className={classnames(styles.icon, `ico-${props.icon}`)}></div>
        <div className={styles.category_title}>{props?.title}</div>
      </div>
      <div>
        {props.index === current && (list.length === 0 ? <Empty /> : list.map((item, index) => <AppItem {...item} key={index} />))}
      </div>
    </div>
  )
}

export function AppContainer() {
  const { category } = useApps()
  return (
    <div className={styles.apps}>
      {category.map((item, index) => <Category index={index} {...item} key={item.id} />)}
    </div>
  )
}

export function Apps() {
  return (
    <AppsProvide>
      <AppContainer />
    </AppsProvide>
  )
}