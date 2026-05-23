import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import Awards from './Awards'
import Resources from './Resources'
import Title from './Title'
import Venue from './Venue'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default function Publication ({ name, tag }: { name: string, tag: string }): JSX.Element {
  const { t } = useTranslation()
  let links = externalLinksInfo.publications[name]
  if (links === undefined) links = { title: '', awards: [], resources: {} }
  const authorsValue = t(`publications.${tag}.${name}.authors`, { returnObjects: true })
  const authors = Array.isArray(authorsValue) ? authorsValue : []
  const title = t(`publications.${tag}.${name}.title`)
  let abstract = t(`publications.${tag}.${name}.abstract`)
  if (abstract === `publications.${tag}.${name}.abstract`) abstract = ''
  const venueNameKey = `publications.${tag}.${name}.venue.name`
  const venueName = t(venueNameKey)
  const venueOthers = t(`publications.${tag}.${name}.venue.others`)
  const awardsValue = t(`publications.${tag}.${name}.awards`, { returnObjects: true })
  const awards = Array.isArray(awardsValue) ? awardsValue : []

  return (
    <div className='publication-item'>
      <AuthorList authors={authors} t={t}/>
      <Title href={links.title} name={title}/>
      <Venue name={venueName} nameI18nKey={venueNameKey} others={venueOthers}/>
      <Awards hrefs={links.awards} awards={awards}/>
      <Resources resources={links.resources} abstract={abstract}/>
    </div>
  )
}
