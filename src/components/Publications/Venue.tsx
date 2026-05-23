import { Trans } from 'next-i18next'

export interface VenueProps {
  i18nKey: string
}

const Venue = ({ i18nKey }: VenueProps): JSX.Element => {
  return (
    <span>
      <Trans i18nKey={i18nKey} components={{ bold: <strong /> }} />.{' '}
    </span>
  )
}

export default Venue
