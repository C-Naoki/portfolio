import React from 'react'

import styles from '@/styles/globals.module.css'

interface ExternalLinkProps {
  url: string
  text: string
  bold?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text, bold = false }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={bold ? styles.linkBold : styles.link}
    >
      {text}
    </a>
  )
}

export default ExternalLink
