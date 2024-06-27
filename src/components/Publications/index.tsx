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

  return (
    <div>
      <Title url={links.title} name={t(`publications.${name}.title`)} />
      <AuthorList authors={t(`publications.${name}.authors`, { returnObjects: true })} />
      <Venue {...t(`publications.${name}.venue`, { returnObjects: true })} />
      <Awards awards={t(`publications.${name}.awards`, { returnObjects: true })} urls={links.awards} />
      <Resources resources={links.resources} />
    </div>
  )
}
