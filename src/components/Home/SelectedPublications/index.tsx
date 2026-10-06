import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import externalLinksInfo from '@/constants/externalLinksInfo'

interface SelectedPublicationItem {
  conference: string
  name: string
  tag: string
}

const selectedPublications: SelectedPublicationItem[] = [
  { conference: 'KDD 2026', tag: 'international-conference', name: 'KDD2026' },
  { conference: 'ICML 2026', tag: 'international-conference', name: 'ICML2026' },
  { conference: 'KDD 2025', tag: 'international-conference', name: 'KDD2025' }
]

const SelectedPublications = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className="custom-list selected-publications">
      <ul>
        {selectedPublications.map(({ conference, tag, name }) => {
          const links = externalLinksInfo.publications[name]
          const titleUrl = links?.title ?? ''
          const title = t(`publications.${tag}.${name}.title`)
          const authorsValue = t(`publications.${tag}.${name}.authors`, { returnObjects: true })
          const authors = Array.isArray(authorsValue) ? authorsValue : []
          const firstAuthor = typeof authors[0] === 'string' ? authors[0] : ''

          return (
            <li className="selected-publication" key={name}>
              <span>{firstAuthor}{authors.length > 1 ? ' et al., ' : ', '}</span>
              {titleUrl.trim() !== ''
                ? (
                <a className="link" href={titleUrl} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
                  )
                : (
                <Link className="link" href={`/publications#${tag}`}>
                  {title}
                </Link>
                  )},{' '}
                <span>{conference}</span>.
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SelectedPublications
