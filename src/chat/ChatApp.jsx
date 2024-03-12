import React, { Suspense } from 'react'
import { ChatProvider } from './context/index.jsx'
import { Loading } from '../components/Loading'
import './style.less'
const Chat = React.lazy(() => import("./Chat"))

export default function ChatApp() {
  return (
    <Suspense fallback={<Loading />}>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </Suspense>
  )
}
