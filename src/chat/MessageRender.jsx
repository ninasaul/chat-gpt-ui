import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useGlobal } from './context'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import './style/markdown.less'

export const MessageRender = memo((props) => {
  const { options } = useGlobal()
  const style = options.general.theme === 'dark' ? oneDark : oneLight

  // Function to process text content and make br-wrapped text bold
  const processContent = (content) => {
    if (typeof content !== 'string') return content;
    return content.replace(/<br>(.*?)<br>/g, '**$1**');
  };

  return (
    <ReactMarkdown
      className="z-ui-markdown"
      children={processContent(props.children)}
      remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
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
        },
        // Add custom components for other markdown elements
        p: ({ children }) => <p className="markdown-paragraph">{children}</p>,
        strong: ({ children }) => <strong className="markdown-bold">{children}</strong>,
        em: ({ children }) => <em className="markdown-italic">{children}</em>,
        h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
        ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
        ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
        li: ({ children }) => <li className="markdown-li">{children}</li>,
        blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>
      }}
    />
  )
})
