import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import useTranslationKeys from '@/lib/hooks/useTranslationKeys'

const News = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = useTranslationKeys(i18n, 'news')
  const newsKeys: Array<{ body: string, date: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else if (key.endsWith('-date')) {
      const body = key.replace('-date', '')
      if (keys.includes(body)) {
        newsKeys.push({ body, date: key })
      }
    }
  }

  return (
    <ul className="news">
      {newsKeys.map(({ body, date }, index) => (
        <li key={index} data-marker={t(`news.${date}`)}>
          <span>{t(`news.${body}`)}</span>
        </li>
      ))}
    </ul>
  )
}

export default News