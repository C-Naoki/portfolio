import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'
import ExternalLinksInfo from '@/constants/externalLinksInfo'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const Misc = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = fetchTranslationKeys(i18n, 'misc')
  const links = ExternalLinksInfo.misc
  const miscKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (!key.includes('-')) {
      if (keys.includes(key)) {
        miscKeys.push({ body: key })
      }
    }
  }

  return (
    <div className="custom-list">
      <ul>
        {miscKeys.map(({ body }, index) => {
          const contents = []
          let contentIndex = 1
          let currentContent
          while ((currentContent = t(`misc.${body}-content${contentIndex}`)) !== `misc.${body}-content${contentIndex}`) {
            contents.push(currentContent)
            contentIndex++
          }

          return (
            <li key={index} data-marker={t(`misc.${body}-date`)}>
              <span>{t(`misc.${body}`)} </span>
              {links[body] !== undefined && (
                <ExternalLink url={links[body]} bracket={true}/>
              )}
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
    </div>
  )
}

export default Misc
