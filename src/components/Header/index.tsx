import React, { useState } from 'react'

import { faGoogleScholar, faOrcid, faSpeakerDeck } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { FaGithub, FaLinkedin, FaSearch, FaTwitter } from 'react-icons/fa'

import DrawerContent from './DrawerContent'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

import externalLinksInfo from '@/constants/externalLinksInfo'
import styles from '@/styles/header.module.css'

interface AnimatedButtonProps {
  href: string
  children: React.ReactNode
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <Button className={styles.button} color='inherit'>
        {children}
      </Button>
    </Link>
  )
}

const Header: React.FC<{ onSearch?: (value: string) => void, searchValue?: string }> = ({ onSearch, searchValue }) => {
  const { t } = useTranslation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = (): void => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div>
      <AppBar position='fixed' className={styles.appBar}>
        <Toolbar>
          <Link href='/' className={styles.title}>
            <Typography variant='h6'>
              {t('name', { lng: 'en' })}
            </Typography>
          </Link>
          <div className={styles.headerOptionsLarge}>
            <AnimatedButton href='/'>Home</AnimatedButton>
            {externalLinksInfo.zenn !== '' && (
              <AnimatedButton href='/blog'>Blog</AnimatedButton>
            )}
            <AnimatedButton href='/publications'>Publications</AnimatedButton>
            <AnimatedButton href='/contact'>Contact</AnimatedButton>
            <div className={styles.toolbarCenter}>
              <HeaderExternalLink href={externalLinksInfo.github} className={styles.toolbarCenter}>
                <FaGithub className={styles.headerIcon}/>
              </HeaderExternalLink>
              <HeaderExternalLink href={externalLinksInfo.twitter} className={styles.toolbarCenter}>
                <FaTwitter className={styles.headerIcon}/>
              </HeaderExternalLink>
              <HeaderExternalLink href={externalLinksInfo.linkedin} className={styles.toolbarCenter}>
                <FaLinkedin className={styles.headerIcon}/>
              </HeaderExternalLink>
              <HeaderExternalLink href={externalLinksInfo.googlescholar} className={styles.toolbarCenter}>
                <FontAwesomeIcon icon={faGoogleScholar} className={styles.headerIcon}/>
              </HeaderExternalLink>
              <HeaderExternalLink href={externalLinksInfo.orcid} className={styles.toolbarCenter}>
                <FontAwesomeIcon icon={faOrcid} className={styles.headerIcon}/>
              </HeaderExternalLink>
              <HeaderExternalLink href={externalLinksInfo.speakerdeck} className={styles.toolbarCenter}>
                <FontAwesomeIcon icon={faSpeakerDeck} className={styles.headerIcon}/>
              </HeaderExternalLink>
              <a className={styles.LanguageSwitcherLarge}>
                <LanguageSwitcher />
              </a>
              <a className={styles.ThemeSwitcherLarge}>
                <ThemeSwitcher />
              </a>
              <Link href="/search" className={styles.SearchBoxLarge}>
                <FaSearch className={styles.headerIcon} aria-label="search"/>
              </Link>
            </div>
          </div>
          <div className={styles.headerOptionsSmall}>
            <a className={styles.LanguageSwitcherSmall}>
              <LanguageSwitcher />
            </a>
            <a className={styles.ThemeSwitcherSmall}>
              <ThemeSwitcher />
            </a>
            <Link href="/search" className={styles.SearchBoxSmall}>
              <FaSearch className={styles.headerIcon} aria-label="search"/>
            </Link>
            <IconButton
              className={styles.hamburgerMenu}
              edge='end'
              color='inherit'
              aria-label='menu'
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              classes={{ paper: styles.drawer }}
              anchor='right'
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <DrawerContent handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header

function HeaderExternalLink ({ href, className, children }: { href: string, className: string, children: React.ReactNode }): JSX.Element {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={href === '' ? { display: 'none' } : undefined}
    >
      {children}
    </a>
  )
}
