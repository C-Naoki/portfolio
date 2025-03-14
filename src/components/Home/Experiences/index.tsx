import ExperiencesItem from './ExperiencesItem'

import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import HorizontalLine from '@/components/Uikit/HorizontalLine'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const Experiences = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = fetchTranslationKeys(i18n, 'experiences')
  const experiencesKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (!key.includes('-')) {
      if (keys.includes(key)) {
        experiencesKeys.push({ body: key })
      }
    }
  }

  return (
    <div className='experiences'>
      {experiencesKeys.map(({ body }, index) => (
        <span key={index}>
          <ExperiencesItem type={body} t={t} />
          {index !== experiencesKeys.length - 1 && <HorizontalLine main={false} />}
        </span>
      ))}
    </div>
  )
}

export default Experiences
