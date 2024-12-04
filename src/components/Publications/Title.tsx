import React from 'react'

import ExternalLink from '@/components/Uikit/ExternalLink'

interface TitleProps {
  href: string
  name: string
}

const Title: React.FC<TitleProps> = ({ href, name }) => {
  return (
    <span>
      <ExternalLink url={href} text={name} bold={true}/>{'. '}
    </span>
  )
}

export default Title
