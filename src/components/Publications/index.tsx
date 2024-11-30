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
  const authors = t(`publications.${name}.authors`, { returnObjects: true }) as string[]
  const venueName = t(`publications.${name}.venue.name`)
  const venueOthers = t(`publications.${name}.venue.others`)
  const awards = t(`publications.${name}.awards`, { returnObjects: true }) as string[]

  return (
    <div className='publication'>
      <AuthorList authors={authors} t={t} />
      <Title href={links.title} name={t(`publications.${name}.title`)} />
      <Venue name={venueName} others={venueOthers} />
      <Awards hrefs={links.awards} awards={awards} />
      <Resources resources={links.resources} />
    </div>
  )
}
