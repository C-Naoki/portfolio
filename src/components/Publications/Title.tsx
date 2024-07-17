import React from 'react'

interface TitleProps {
  href: string
  name: string
}

const Title: React.FC<TitleProps> = ({ href, name }) => {
  return (
    <div>
      <a href={href}>
        <h3 className='publication-heading'>{name}. </h3>
      </a>
    </div>
  )
}

export default Title
