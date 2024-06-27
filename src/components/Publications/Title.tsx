import React from 'react'

import ExternalLink from '@/components/Uikit/ExternalLink'

interface TitleProps {
  url: string
  name: string
}

const Title: React.FC<TitleProps> = ({ url, name }) => {
  return (
    <div>
      <ExternalLink url={url} text={name} bold={true} />
    </div>
  )
}

export default Title
