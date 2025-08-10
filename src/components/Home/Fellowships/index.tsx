import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'
import ExternalLinksInfo from '@/constants/externalLinksInfo'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const Fellowships = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = fetchTranslationKeys(i18n, 'fellowships')
  const links = ExternalLinksInfo.fellowships
  const fellowshipKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading' || key === 'message') {
      continue
    } else if (!key.includes('-date') && !key.includes('-content')) {
      if (keys.includes(key)) {
        fellowshipKeys.push({ body: key })
      }
    }
  }

  return (
    <div className="custom-list">
      <ul style={{ marginBottom: '7.0px' }}>
        {fellowshipKeys.map(({ body }, index) => {
          const fellowshipName = t(`fellowships.${body}`)
          const contents = []
          let contentIndex = 1
          let currentContent
          while ((currentContent = t(`fellowships.${body}-content${contentIndex}`)) !== `fellowships.${body}-content${contentIndex}`) {
            contents.push(currentContent)
            contentIndex++
          }

          return (
            <li key={index} data-marker={t(`fellowships.${body}-date`)}>
              {links[body] !== undefined
                ? <ExternalLink url={links[body]} text={fellowshipName} />
                : <span>{fellowshipName}</span>
              }
              {contents.length > 0 && (
                <ul>
                  {contents.map((content, i) => (
                    <li key={i}>{content}</li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
      <span style= {{ fontFamily: 'Lato', fontStyle: 'italic', fontSize: '1.05rem' }}>
        {t('fellowships.message')}
      </span>
    </div>
  )
}

export default Fellowships
