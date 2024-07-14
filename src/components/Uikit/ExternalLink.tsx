import React from 'react'

import styles from '@/styles/globals.module.css'

interface ExternalLinkProps {
  url: string
  text?: string
  bold?: boolean
  bracket?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text = 'link', bold = false, bracket = false }) => {
  const linkElement = (
    <a
      className={bold ? styles.linkBold : styles.link}
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
