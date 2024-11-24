import EducationItem from './EducationItem'

import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import HorizontalLine from '@/components/Uikit/HorizontalLine'
import useTranslationKeys from '@/lib/hooks/useTranslationKeys'

const Education = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = useTranslationKeys(i18n, 'education')
  const educationKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (!key.includes('-')) {
      if (keys.includes(key)) {
        educationKeys.push({ body: key })
      }
    }
  }

  return (
    <div>
      <HorizontalLine />
      {educationKeys.map(({ body }, index) => (
        <span key={index}>
          <EducationItem type={body} t={t} />
          {index !== educationKeys.length - 1 && <HorizontalLine main={false} />}
        </span>
      ))}
    </div>
  )
}

export default Education
