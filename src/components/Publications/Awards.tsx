import { useTranslation } from 'next-i18next'

const Awards = ({ hrefs, awards }: { hrefs: string[], awards: string[] }): JSX.Element | null => {
  const { i18n } = useTranslation()

  if (awards.length === 0) return null

  const awardsEntries = awards.map((award, index) => ({
    key: index,
    name: award,
    href: hrefs[index]
  }))

  const getClassName = (): string => i18n.language === 'en' ? 'highlight italic' : 'highlight'

  return (
    <span className={`${getClassName()} award`} >
      <span>
        {awardsEntries.map(({ key, name, href }, index) => (
          <span key={key} className={getClassName()}>
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {name}
            </a>
            {index < awardsEntries.length - 1 ? ', ' : '. '}
          </span>
        ))}
      </span>
    </span>
  )
}

export default Awards
