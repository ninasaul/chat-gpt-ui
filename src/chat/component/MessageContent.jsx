import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useGlobal } from '../context'

export function MessageContent(props) {
  const { options } = useGlobal()
  const style = options.general.theme === 'light' ? oneDark : oneLight

  return (
    <ReactMarkdown
      children={props.children}
      components={{
        code({ node, inline, className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...rest}
              children={String(children).replace(/\n$/, '')}
              style={style}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}
    ></ReactMarkdown>
  )
}
