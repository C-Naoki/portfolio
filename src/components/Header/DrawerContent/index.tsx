import React from 'react'

import { faGithub, faGoogleScholar, faLinkedin, faOrcid, faSpeakerDeck, faTwitter } from '@fortawesome/free-brands-svg-icons'
import BookIcon from '@mui/icons-material/Book'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import { List } from '@mui/material'

import ExternalLinkListItem from './ExternalLinkListItem'
import NavigationListItem from './NavigationListItem'

import externalLinksInfo from '@/constants/externalLinksInfo'
import styles from '@/styles/header.module.css'

interface DrawerContentProps {
  handleDrawerToggle: () => void
}

const DrawerContent: React.FC<DrawerContentProps> = ({ handleDrawerToggle }) => {
  const navigationItems = [
    { href: '/', text: 'Home', icon: HomeIcon },
    { href: '/blog', text: 'Blog', icon: BookIcon },
    { href: '/publications', text: 'Publications', icon: DescriptionIcon },
    { href: '/contact', text: 'Contact', icon: ContactMailIcon }
  ]

  const externalLinkItems = [
    { href: externalLinksInfo.github, text: 'GitHub', icon: faGithub },
    { href: externalLinksInfo.twitter, text: 'Twitter', icon: faTwitter },
    { href: externalLinksInfo.linkedin, text: 'LinkedIn', icon: faLinkedin },
    { href: externalLinksInfo.googlescholar, text: 'Google Scholar', icon: faGoogleScholar },
    { href: externalLinksInfo.orcid, text: 'ORCID', icon: faOrcid },
    { href: externalLinksInfo.speakerdeck, text: 'Speaker Deck', icon: faSpeakerDeck }
  ]

  const handleCloseDrawer = (): void => {
    handleDrawerToggle()
  }

  return (
    <div className={styles.drawerContainer}>
      <List>
        <div className={styles.navigationSection}>
          {navigationItems.map((item, index) => (
            <NavigationListItem
              key={index}
              href={item.href}
              icon={item.icon}
              text={item.text}
              onClick={handleCloseDrawer}
            />
          ))}
        </div>
        <div className={styles.externalLinkSection}>
          {externalLinkItems.map((item, index) => (
            item.href !== '' && (
              <ExternalLinkListItem
                key={index}
                href={item.href}
                icon={item.icon}
                text={item.text}
              />
            )
          ))}
        </div>
      </List>
    </div>
  )
}

export default DrawerContent
