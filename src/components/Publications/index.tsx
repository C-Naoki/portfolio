import { useTranslation } from 'next-i18next'

import AuthorList from './AuthorList'
import Awards from './Awards'
import Resources from './Resources'
import Title from './Title'
import type { VenueProps } from './Venue'
import Venue from './Venue'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default function Publication ({ name }: { name: string }): JSX.Element {
  const { t } = useTranslation()
  const links = externalLinksInfo[name]
  const authors = t(`publications.${name}.authors`, { returnObjects: true }) as string[]
  const venue = t(`publications.${name}.venue`, { returnObjects: true }) as VenueProps
  const awards = t(`publications.${name}.awards`, { returnObjects: true }) as string[]

  return (
    <div className='publication'>
      <Title href={links.title} name={t(`publications.${name}.title`)} />
      <AuthorList authors={authors} />
      <Venue name={venue.name} others={venue.others} />
      <Resources resources={links.resources} />
      <Awards awards={awards} urls={links.awards} />
    </div>
  )
}
