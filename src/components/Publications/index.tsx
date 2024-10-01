import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import Awards from './Awards'
import Resources from './Resources'
import Title from './Title'
import Venue from './Venue'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default function Publication ({ name }: { name: string }): JSX.Element {
  const { t } = useTranslation()
  const links = externalLinksInfo[name]
  const authors: string[] = t(`publications.${name}.authors`, { returnObjects: true })
  const venueName = t(`publications.${name}.venue.name`)
  const venueOthers = t(`publications.${name}.venue.others`)
  const awards: string[] = t(`publications.${name}.awards`, { returnObjects: true })

  return (
    <div className='publication'>
      <Title href={links.title} name={t(`publications.${name}.title`)} />
      <AuthorList authors={authors} />
      <Venue name={venueName} others={venueOthers} />
      <Resources resources={links.resources} />
      <Awards awards={awards} urls={links.awards} />
    </div>
  )
}
