import React from 'react'

const AuthorList = ({ authors }: { authors: string[] }): JSX.Element => {
  const highlightStyle: React.CSSProperties = {
    textDecoration: 'underline',
    whiteSpace: 'nowrap'
  }

  const noWrapStyle: React.CSSProperties = {
    whiteSpace: 'nowrap'
  }

  const authorEntries = authors.map((author, index) => ({
    key: index,
    name: author,
    style: author === '千原 直己' || author === 'Naoki Chihara' ? highlightStyle : noWrapStyle
  }))

  return (
    <div>
      {authorEntries.map(({ key, name, style }, index) => (
        <span key={key}>
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
