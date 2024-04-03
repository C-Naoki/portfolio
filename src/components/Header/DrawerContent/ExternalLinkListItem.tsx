import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import styles from '@/styles/header.module.css'

interface ExternalLinkListItemProps {
  href: string
  icon: IconDefinition
  text: string
}

const ExternalLinkListItem: React.FC<ExternalLinkListItemProps> = ({ href, icon, text }) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer' className={styles.externalLink}>
      <ListItem button className={styles.listItem}>
        <ListItemIcon className={styles.externalLinkIcon}>
          <FontAwesomeIcon icon={icon} className={styles.FontAwesomeIcon} />
        </ListItemIcon>
        <ListItemText classes={{ primary: styles.listItemText }} primary={text} />
      </ListItem>
    </a>
  )
}

export default ExternalLinkListItem
