const AuthorList = ({ authors }: { authors: string[] }): JSX.Element => {
  const highlightStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }

  const authorEntries = authors.map((author, index) => ({
    key: index,
    name: author,
    style: author === '千原 直己' || author === 'Naoki Chihara' ? highlightStyle : {}
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
