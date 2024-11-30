import React from 'react'

import type { TFunction } from 'next-i18next'

const AuthorList = ({ authors, t }: { authors: string[], t: TFunction }): JSX.Element => {
  const nameVariants = [t('name', { lng: 'en' }), t('name', { lng: 'ja' })]

  const highlightStyle: React.CSSProperties = {
    textDecoration: 'underline',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }

  const noWrapStyle: React.CSSProperties = {
    whiteSpace: 'nowrap'
  }

  const authorEntries = authors.map((author) => ({
    name: author,
    style: nameVariants.includes(author) ? highlightStyle : noWrapStyle
  }))

  return (
    <span>
      {authorEntries.map(({ name, style }, index) => (
        <span key={name}>
          <span style={style}>
            {name}
          </span>
          {index < authorEntries.length - 1 ? ', ' : '. '}
        </span>
      ))}
    </span>
  )
}

export default AuthorList
