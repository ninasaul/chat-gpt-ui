import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useGlobal } from './context'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import './style/markdown.less'

export const MessageRender = memo((props) => {
  const { options } = useGlobal()
  const style = options.general.theme === 'dark' ? oneDark : oneLight
  return (
    <ReactMarkdown
      className="z-ui-markdown"
      children={props.children}
      remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
      components={{
        code({ node, inline, className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...rest}
              children={children}
              style={style}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={`code-line`}>
              {children}
            </code>
          )
        }
      }}
    />
  )
})
