import React from 'react'

const AuthorList = ({ authors }: { authors: string[] }): JSX.Element => {
  const highlightStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }

  return (
    <>
      {authors.map((author, index) => (
        <React.Fragment key={index}>
          <span style={author === '千原 直己' || author === 'Naoki Chihara' ? highlightStyle : {}}>
            {author}
          </span>
          {index < authors.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </>
  )
}

export default AuthorList
