import React, { useRef, useState, useEffect } from 'react'
import { classnames } from '../../components/utils'
import { useGlobal } from '../context'
import styles from './style.module'

export const ScrollView = (props) => {
  const { children, className, ...rest } = props
  const scrollRef = useRef(null)
  const { is, chat } = useGlobal()
  const [height, setHeight] = useState(0);
  const handleScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const currentHeight = scrollRef.current.scrollHeight
    if (currentHeight - height > 60) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setHeight(currentHeight)
    }
  };
  useEffect(() => {
    scrollToBottom()
  }, [is.thinking]);

  useEffect(() => {
    window.requestAnimationFrame(handleScroll);
    setHeight(scrollRef.current.scrollHeight);
  }, [scrollRef.current]);

  return <div ref={scrollRef} className={classnames(styles.scroll, className)} {...rest}> {children}</div >
}
