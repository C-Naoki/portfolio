import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import Title from './Title'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default function Patent ({ name }: { name: string }): JSX.Element {
  const { t } = useTranslation()
  let links = externalLinksInfo.publications[name]
  if (links === undefined) links = { title: '', awards: [], resources: {} }
  const authors = t(`publications.patent.${name}.authors`, { returnObjects: true }) as string[]
  const title = t(`publications.patent.${name}.title`)
  const tokugan = t(`publications.patent.${name}.tokugan`)
  const tokkai = t(`publications.patent.${name}.tokkai`)
  const filingDate = t(`publications.patent.${name}.filing-date`)
  const publicationDate = t(`publications.patent.${name}.publication-date`)

  return (
    <div className='publication-item'>
      <AuthorList authors={authors} t={t}/>
      <Title href={links.title} name={title} />
      <span>{tokugan}, </span>
      {tokkai !== '' && <span>{tokkai}, </span>}
      <span>出願日: {filingDate}</span>
      {publicationDate !== '' && <span>, 公開日: {publicationDate}</span>}
      <span>. </span>
    </div>
  )
}
