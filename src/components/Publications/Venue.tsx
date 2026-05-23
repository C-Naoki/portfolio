import type { ReactNode } from 'react'

import { Trans } from 'next-i18next'

import containsJapanese from '@/lib/utils/containsJapanese'

export interface VenueProps {
  name: string
  nameI18nKey?: string
  others: string
}

const Venue = (venue: VenueProps): JSX.Element => {
  const isJapanese = containsJapanese(venue.name)
  const venueName: ReactNode = venue.nameI18nKey === undefined
    ? venue.name
    : <Trans i18nKey={venue.nameI18nKey} components={{ bold: <strong /> }} />

  return (
    <span>
      <span className={'venue-name'}>{venueName}, </span>
      <span className={`${isJapanese ? 'venue-name' : ''}`}>{venue.others}.</span>
      {' '}
    </span>
  )
}

export default Venue
