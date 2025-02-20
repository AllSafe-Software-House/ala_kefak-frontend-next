import Link from 'next/link'
import React from 'react'

const LinkComp = ({href,text,classNames=""}) => {
  return (
    <Link href={href}
    className={`block my-4 w-full text-sm md:text-xl font-medium
      hover:text-primary animation
      ${classNames}`}
    >{text}</Link>
  )
}

export default LinkComp