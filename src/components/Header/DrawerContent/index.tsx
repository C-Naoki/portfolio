import React from 'react'

import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { List } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import DescriptionIcon from '@material-ui/icons/Description'
import HomeIcon from '@material-ui/icons/Home'

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
