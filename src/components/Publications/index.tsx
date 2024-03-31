import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import FileLinks from './FileLinks'
import Title from './Title'

import publicationsInfo from '@/constants/publicationsInfo'

export default function Publication ({ name }: { name: string }): JSX.Element {
  const info = publicationsInfo[name]

  const { i18n } = useTranslation()
  const detail = i18n.language === 'ja' && info.ja !== undefined ? info.ja : info.en ?? info.ja

  return (
    <div>
      {detail !== undefined && (
        <>
          <AuthorList authors={detail.authors} /><br />
          <Title url={info.url} title={detail.title} /><br />
          {detail.venue}<br />
          <FileLinks name={name} />
        </>
      )}
    </div>
  )
}
