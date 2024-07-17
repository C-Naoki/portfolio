import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { useTranslation } from 'next-i18next'

const Awards = ({ awards, urls }: { awards: string[], urls: string[] }): JSX.Element | null => {
  if (awards.length === 0) return null

  const { i18n } = useTranslation()

  const awardsEntries = awards.map((award, index) => ({
    key: index,
    name: award,
    url: urls[index]
  }))

  const getClassName = (): string => i18n.language === 'en' ? 'highlight italic' : 'highlight'

  return (
    <div className={`${getClassName()} award`} >
      <EmojiEventsIcon className='award-icon' />
      <div>
        {awardsEntries.map(({ key, name }, index) => (
          <span key={key}>
            <span className={getClassName()} >
              {name}{index < awardsEntries.length - 1 ? ', ' : ''}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Awards
