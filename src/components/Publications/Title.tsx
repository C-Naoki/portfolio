import React from 'react'

import ExternalLink from '@/components/Uikit/ExternalLink'

interface TitleProps {
  url: string
  title: string
}

const Title: React.FC<TitleProps> = ({ url, title }) => {
  return (
    <div>
      <ExternalLink url={url} text={title} />
    </div>
  )
}

export default Title
