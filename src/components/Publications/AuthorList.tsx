import React from 'react'

const AuthorList = ({ authors }: { authors: string[] }): JSX.Element => {
  const highlightStyle: React.CSSProperties = {
    textDecoration: 'underline',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }

  const noWrapStyle: React.CSSProperties = {
    whiteSpace: 'nowrap'
  }

  const authorEntries = authors.map((author, index) => ({
    name: author,
    style: author === '千原 直己' || author === 'Naoki Chihara' ? highlightStyle : noWrapStyle
  }))

  return (
    <div>
      {authorEntries.map(({ name, style }, index) => (
        <span key={name}>
          <span style={style}>
            {name}
          </span>
          {index < authorEntries.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  )
}

export default AuthorList
