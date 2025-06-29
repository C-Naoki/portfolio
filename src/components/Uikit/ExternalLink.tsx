import React from 'react'

interface ExternalLinkProps {
  url: string
  text?: React.ReactNode
  bold?: boolean
  bracket?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text = 'link', bold = false, bracket = false }) => {
  const linkElement = (
    <a
      className={bold ? 'link bold' : 'link'}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  )

  if (bracket) {
    return (
      <span>
        [{linkElement}]
      </span>
    )
  }

  return linkElement
}

export default ExternalLink
