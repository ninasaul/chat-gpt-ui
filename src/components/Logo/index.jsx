import React from 'react'

export function Logo(props) {
  const { logo } = props
  return <h1 className="flex-c logo">
    <img className='logo-img' alt="FIN-GPT" src={logo} />
    <span>FIN-GPT</span>
  </h1>
}
