import React, { Suspense } from 'react'
import { ChatProvider } from './context'
import { Loading } from '@/components'
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
