import React from 'react'

import ExternalLink from '@/components/Uikit/ExternalLink'

interface LinkProps {
  url: string
  text?: string
}

const Link: React.FC<LinkProps> = ({ url, text = 'link' }) => {
  return (
    <span>
      {' '}[<ExternalLink url={url} text={text} />]
    </span>
  )
}

export default Link
