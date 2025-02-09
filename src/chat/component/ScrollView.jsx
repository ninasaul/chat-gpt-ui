import React, { useRef, useState, useEffect } from 'react'
import { classnames } from '../../components/utils'
import { useGlobal } from '../context'
import styles from './style.module'

export const ScrollView = (props) => {
  const { children, className, ...rest } = props
  const scrollRef = useRef(null)
  const { is, chat } = useGlobal()
  const [height, setHeight] = useState(0);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };

  // Scroll on new messages or when thinking state changes
  useEffect(() => {
    scrollToBottom();
  }, [chat, is.thinking]);

  // Initial scroll when component mounts
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div 
      ref={scrollRef} 
      className={classnames(styles.scroll, className)} 
      {...rest}
    > 
      {children}
    </div>
  )
}
