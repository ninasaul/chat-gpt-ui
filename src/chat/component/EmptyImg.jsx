import React from 'react'
import empty from '../../assets/images/empty.svg'
import emptyDark from '../../assets/images/empty-dark.svg'
import { useGlobal } from '../context'

export default function EmptyImg() {
  const { options } = useGlobal()
  return (
    <img src={options.general.theme === 'light' ? empty : emptyDark} />
  )
}
