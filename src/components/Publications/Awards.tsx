const Awards = ({ awards }: { awards: string[] }): JSX.Element => {
  const awardsEntries = awards.map((award, index) => ({
    key: index,
    name: award,
    className: 'highlight-style'
  }))

  return (
    <div>
      {awardsEntries.map(({ key, name, className }, index) => (
        <span key={key}>
          <span className={className}>
            {name}
          </span>
          {index < awards.length - 1 ? '' : ''}
        </span>
      ))}
    </div>
  )
}

export default Awards
