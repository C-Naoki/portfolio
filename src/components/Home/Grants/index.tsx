import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'
import ExternalLinksInfo from '@/constants/externalLinksInfo'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const Grants = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element | null => {
  const keys = fetchTranslationKeys(i18n, 'grants')
  const links = ExternalLinksInfo.grants
  const grantsKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (!key.includes('-date') && !key.includes('-content')) {
      if (keys.includes(key)) {
        grantsKeys.push({ body: key })
      }
    }
  }

  return (
    <div className="custom-list">
      <ul>
        {grantsKeys.map(({ body }, index) => {
          const grantName = t(`grants.${body}`)
          const contents = []
          let contentIndex = 1
          let currentContent
          while ((currentContent = t(`grants.${body}-content${contentIndex}`)) !== `grants.${body}-content${contentIndex}`) {
            contents.push(currentContent)
            contentIndex++
          }

          return (
            <li key={index} data-marker={t(`grants.${body}-date`)}>
              {links[body] !== undefined
                ? <ExternalLink url={links[body]} text={grantName} />
                : <span>{grantName}</span>
              }
              {contents.length > 0 && (
                <ul style={{ marginTop: '0px' }}>
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

export default Grants
