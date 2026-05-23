const Awards = ({ hrefs, awards }: { hrefs: string[], awards: string[] }): JSX.Element | null => {
  if (awards.length === 0) return null

  const awardsEntries = awards.map((award, index) => ({
    key: index,
    name: award,
    href: hrefs[index]
  }))

  return (
    <div className='highlight'>
      <span>
        {awardsEntries.map(({ key, name, href }, index) => (
          <span key={key} className='highlight'>
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {name}
            </a>
            {index < awardsEntries.length - 1 ? ', ' : ''}
          </span>
        ))}
      </span>
    </div>
  )
}

export default Awards
