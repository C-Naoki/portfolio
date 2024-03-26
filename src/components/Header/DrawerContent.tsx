import React from 'react'

import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { List, ListItem } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import DescriptionIcon from '@material-ui/icons/Description'
import HomeIcon from '@material-ui/icons/Home'

import ExternalLinkListItem from './ExternalLinkListItem'
import NavigationListItem from './NavigationListItem'

import LanguageSwitcher from '@/components/Header/LanguageSwitcher'
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
    { href: 'https://github.com/C-Naoki', text: 'GitHub', icon: faGithub },
    { href: 'https://twitter.com/C__Naoki', text: 'Twitter', icon: faTwitter },
    { href: 'https://www.linkedin.com/in/naoki-chihara-0a35a827a/', text: 'LinkedIn', icon: faLinkedin }
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
        <ListItem>
          <LanguageSwitcher />
        </ListItem>
      </List>
    </div>
  )
}

export default DrawerContent
