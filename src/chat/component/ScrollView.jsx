import React, { useRef, useEffect } from 'react'
import { setClassName } from '../../components/utils'
// import { useDebounce } from '../hooks'
import { useGlobal } from '../context'

export const ScrollView = (props) => {
  const { children, className, ...rest } = props
  const scrollRef = useRef(null)
  const { is } = useGlobal()

  const handleScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  // const debouncedCallback = useDebounce(scrollToBottom, 500)

  useEffect(() => {
    scrollToBottom()
  }, [is.thinking]);

  useEffect(() => {
    window.requestAnimationFrame(handleScroll);
  }, [scrollRef.current]);


  return <div ref={scrollRef} className={setClassName({ name: 'scroll-view', className })} {...rest}>{children}</div>
}
