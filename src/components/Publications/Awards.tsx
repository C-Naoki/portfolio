const Awards = ({ awards, urls }: { awards: string[], urls: string[] }): JSX.Element => {
  const awardsEntries = awards.map((award, index) => ({
    key: index,
    name: award,
    url: urls[index],
    className: 'highlight-style'
  }))

  return (
    <div>
      {awardsEntries.map(({ key, name, className }, index) => (
        <span key={key}>
          <span className={className}>
            {name}{index < awardsEntries.length - 1 ? ', ' : ''}
          </span>
        </span>
      ))}
    </div>
  )
}

export default Awards
