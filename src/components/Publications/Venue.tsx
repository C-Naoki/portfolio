export interface VenueProps {
  name: string
  others: string
}

const Venue = (venue: VenueProps): JSX.Element => {
  return (
    <div>
      <span style={{ fontStyle: 'italic', fontFamily: 'Lato', fontSize: 15 }}>{venue.name}</span>
      <span>, {venue.others}.</span>
    </div>
  )
}

export default Venue
