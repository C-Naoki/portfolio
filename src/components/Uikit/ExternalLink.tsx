import PropTypes from 'prop-types'

import styles from '@/styles/globals.module.css'

interface ExternalLinkProps {
  url: string
  text: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {text}
    </a>
  )
}

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default ExternalLink
