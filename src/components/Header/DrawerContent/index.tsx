import React from 'react'

import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import BookIcon from '@mui/icons-material/Book'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import DescriptionIcon from '@mui/icons-material/Description'
import HomeIcon from '@mui/icons-material/Home'
import { List } from '@mui/material'

import ExternalLinkListItem from './ExternalLinkListItem'
import NavigationListItem from './NavigationListItem'

import externalLinks from '@/constants/externalLinks'
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
    { href: externalLinks.github, text: 'GitHub', icon: faGithub },
    { href: externalLinks.twitter, text: 'Twitter', icon: faTwitter },
    { href: externalLinks.linkedin, text: 'LinkedIn', icon: faLinkedin }
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
            <ExternalLinkListItem
              key={index}
              href={item.href}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </div>
      </List>
    </div>
  )
}

export default DrawerContent
