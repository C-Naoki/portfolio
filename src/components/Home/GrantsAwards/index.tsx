import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'
import ExternalLinksInfo from '@/constants/externalLinksInfo'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const GrantsAwards = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = fetchTranslationKeys(i18n, 'grants-awards')
  const links = ExternalLinksInfo.grants_awards
  const grantsKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (!key.includes('-')) {
      if (keys.includes(key)) {
        grantsKeys.push({ body: key })
      }
    }
  }

  return (
    <div>
      <div className="custom-list">
        <ul>
          {grantsKeys.map(({ body }, index) => {
            const contents = []
            let contentIndex = 1
            let currentContent
            while ((currentContent = t(`grants-awards.${body}-content${contentIndex}`)) !== `grants-awards.${body}-content${contentIndex}`) {
              contents.push(currentContent)
              contentIndex++
            }

            return (
              <li key={index} data-marker={t(`grants-awards.${body}-date`)}>
                <ExternalLink url={links[body] !== undefined && links[body] !== '' ? links[body] : ''} text={t(`grants-awards.${body}`)} />
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
    </div>
  )
}

export default GrantsAwards
