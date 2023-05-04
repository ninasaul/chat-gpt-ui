import React, { useRef, useEffect } from 'react'
import { classnames, setClassName } from '../../components/utils'
// import { useDebounce } from '../hooks'
import { useGlobal } from '../context'
import styles from './style.module'

export const ScrollView = (props) => {
  const { children, className, ...rest } = props
  const scrollRef = useRef(null)
  const { is, chat } = useGlobal()

  const handleScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  // const debouncedCallback = useDebounce(scrollToBottom, 500)

  useEffect(() => {
    scrollToBottom()
  }, [is.thinking, chat]);

  useEffect(() => {
    window.requestAnimationFrame(handleScroll);
  }, [scrollRef.current]);

  return <div ref={scrollRef} className={classnames(styles.scroll, className)} {...rest}> {children}</div >
}
