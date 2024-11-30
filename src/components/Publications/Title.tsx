import React from 'react'

import Link from 'next/link'

interface TitleProps {
  href: string
  name: string
}

const Title: React.FC<TitleProps> = ({ href, name }) => {
  return (
    <span>
      <Link className='link bold' href={href}>{name}</Link>{'. '}
    </span>
  )
}

export default Title
