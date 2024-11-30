import containsJapanese from '@/lib/utils/containsJapanese'

export interface VenueProps {
  name: string
  others: string
}

const Venue = (venue: VenueProps): JSX.Element => {
  const isJapanese = containsJapanese(venue.name)

  return (
    <span>
      <span className={`venue-name ${isJapanese ? '' : 'italic'}`}>{venue.name}, </span>
      <span>{venue.others}.</span>
      {' '}
    </span>
  )
}

export default Venue
