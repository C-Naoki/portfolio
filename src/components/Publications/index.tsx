import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import Awards from './Awards'
import Resources from './Resources'
import Title from './Title'

import publicationsInfo from '@/constants/publicationsInfo'

export default function Publication ({ name }: { name: string }): JSX.Element {
  const info = publicationsInfo[name]

  const { i18n } = useTranslation()
  const detail = i18n.language === 'ja' && info.ja !== undefined ? info.ja : info.en ?? info.ja

  return (
    <div>
      {detail !== undefined && (
        <div>
          <AuthorList authors={detail.authors} />
          <Title url={info.url} title={detail.title} />
          <div>{detail.venue}</div>
          <Awards awards={detail.awards} />
          <Resources {...info.resources} />
        </div>
      )}
    </div>
  )
}
