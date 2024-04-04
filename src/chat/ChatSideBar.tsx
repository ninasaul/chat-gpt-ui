import React, { useState } from 'react'
import { Avatar, Button, Icon, Panel, Tooltip } from '../components'
import { useGlobal } from './context'
import { classnames } from '../components/utils'
import { useOptions } from './hooks'
import { t } from 'i18next'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import smartypants from 'remark-smartypants'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

import styles from './style/sider.module.less'
import 'katex/dist/katex.min.css'


const Option = (props) => {
  const { type, onClick, tooltip } = props
  return (
    <Tooltip text={tooltip}><Icon className={styles.icon} type={type} onClick={onClick} /></Tooltip>
  )
}

let text = `## Über die Anwendung
    
Diese Anwendung ermöglicht den Zugriff auf die Chat-Funktion von
[OpenAI](https://openai.com) (inklusive *GPT4-Turbo*) **ohne Übertragung von personenbezogenen Daten des Benutzers
an OpenAI**. 

Technisch wird dies durch die Verwendung eines API-Schlüssels erreicht, der in der Anwendung hinterlegt ist.
Aus Sicht von OpenAI lassen sich die Anfragen an die API lediglich auf den API-Schlüssel der 
Fachhochschule Südwestfalen zurückführen, sodass die Anfragen nicht auf 
eine einzelne Benutzer*in zurückgeführt werden können.

Bitte beachten Sie, dass OpenAI jedoch die Inhalte der Nachrichten "sieht" und für eine gewisse Zeir speichert (s.u.).
Sie sollten daher **keine sensible Informationen in den Chat eingeben**.

## Datenschutzhinweise

Die Anwendung leitet keine personenbezogenen Daten (etwa den Benutzername oder die IP-Adresse) an OpenAI 
oder andere Dritte weiter. 

Die Chat-Verläufe werden lokal auf Ihrem Gerät (im \`LocalStorage\` des Browsers) gespeichert. 
Die Anwendung der FH speichert lediglich statistische 
Informationen wie die Zahl und der von einer Benutzer*in versendeten Nachrichten.

Laut den [Nutzungsbedingungen von OpenAI](https://openai.com/api-data-privacy) werden eingegebene Texte von 
OpenAI nicht für Trainingszwecke verwendet.
Seitens OpenAI wird der Zugriff auf die API protokolliert, um die Nutzung zu überwachen und die Einhaltung der
Nutzungsbedingungen sicherzustellen.

## Cookies
Die Anwendung verwendet lediglich technisch notwendige Session-Cookies, um die Funktionalität der 
Anwendung zu gewährleisten (Anmeldung an der Anwendung).

## Quellcode
Der Quellcode der Anwendung ist auf GitHub in folgenden Repositories verfügbar:
- Chat-Client: [github.com/fhswf/openai-ui](https://github.com/fhswf/openai-ui)
- Proxy-Server: [github.com/fhswf/openai-proxy](https://github.com/fhswf/openai-proxy)
`

function Modal(props) {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        {props.children}
      </div>
    </>
  )
}


export function ChatSideBar() {
  const [showUserModal, setUserModal] = useState(false)
  const [showAboutModal, setAboutModal] = useState(false)
  const { is, setState, options, user } = useGlobal()
  const { setGeneral } = useOptions()

  const userClick = () => {
    console.log('User clicked')
    setUserModal(!showUserModal)
  }

  const logout = () => {
    console.log('Logout')
    window.location.href = import.meta.env.VITE_LOGOUT_URL
  }

  return (
    <div className={classnames(styles.sider, 'flex-c-sb flex-column')} data-testid="LeftSideBar">
      <div className={classnames(styles.tool, 'flex-c-sb flex-column')}>
        <Avatar src={user?.avatar || ""} onClick={userClick} dataTestId="UserInformationBtn"/>
        {showUserModal &&
          <Modal>

            <Panel title="User information" className={styles.user} onClose={() => setUserModal(false)} dataTestId="UserInformation">
              <Button type="icon" icon="close" onClick={() => setUserModal(false)} class={styles.close} data-testid="UserInformationCloseBtn"/>*
              <div className={styles.user}>
                <Avatar src={user?.avatar || ""} />
                <div className={styles.name}>{user?.name}</div>
                <div className={styles.email}>{user?.email}</div>
              </div>
              <div className={styles.panel}>
                <Button type="primary" onClick={logout}>Logout</Button>
              </div>
            </Panel>
          </Modal>
        }
        <Option type="help" onClick={() => { setAboutModal(!showAboutModal) }} tooltip={t("about")} />
        {showAboutModal &&
          <Modal>

            <Panel title="Hinweise" className={styles.user} onClose={() => setAboutModal(false)}>
              <Button type="icon" icon="close" onClick={() => setAboutModal(false)} className={styles.close} />
              <div className={styles.panel}>
                <Markdown
                  className="z-ui-markdown"
                  remarkPlugins={[remarkGfm, remarkMath, smartypants]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {(text)}
                </Markdown>
              </div>
            </Panel>
          </Modal>
        }
      </div>
      <div className={classnames(styles.tool, 'flex-c-sb flex-column')} data-testid="BottomLeftSideBar">
        <Option type="apps" onClick={() => setState({ is: { ...is, apps: true } })} tooltip="Apps" />
        <Option type="history" onClick={() => setState({ is: { ...is, apps: false } })} tooltip="History" />
        <Option type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} tooltip="Theme" />
        <Option type="config" onClick={() => setState({ is: { ...is, config: !is.config } })} tooltip="Config" />
        <Option type={`${is.fullScreen ? 'min' : 'full'}-screen`} onClick={() => setState({ is: { ...is, fullScreen: !is.fullScreen } })}
          tooltip={`${is.fullScreen ? 'Minimize' : 'Maximize'}`} />
      </div>
    </div >
  )
}
