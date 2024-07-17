export interface VenueProps {
  name: string
  others: string
}

const Venue = (venue: VenueProps): JSX.Element => {
  return (
    <div className='venue'>
      <span className='venue-name'>{venue.name}, </span>
      <span>{venue.others}.</span>
      {' '}
    </div>
  )
}

export default Venue
