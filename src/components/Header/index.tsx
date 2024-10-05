import React, { useState } from 'react'

import { faGoogleScholar, faOrcid } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

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

const Header: React.FC = () => {
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
              Naoki Chihara
            </Typography>
          </Link>
          <div className={styles.headerOptionsLarge}>
            <AnimatedButton href='/'>Home</AnimatedButton>
            <AnimatedButton href='/blog'>Blog</AnimatedButton>
            <AnimatedButton href='/publications'>Publications</AnimatedButton>
            <AnimatedButton href='/contact'>Contact</AnimatedButton>
            <div className={styles.toolbarCenter}>
              <a href={externalLinksInfo.github} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter} >
                <FaGithub className={styles.headerIcon} />
              </a>
              <a href={externalLinksInfo.twitter} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter} >
                <FaTwitter className={styles.headerIcon} />
              </a>
              <a href={externalLinksInfo.linkedin} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter} >
                <FaLinkedin className={styles.headerIcon} />
              </a>
              <a href={externalLinksInfo.googlescholar} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter} >
                <FontAwesomeIcon icon={faGoogleScholar} className={styles.headerIcon} />
              </a>
              <a href={externalLinksInfo.orcid} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter} >
                <FontAwesomeIcon icon={faOrcid} className={styles.headerIcon} />
              </a>
              <a className={styles.LanguageSwitcherLarge}>
                <LanguageSwitcher />
              </a>
              <a className={styles.ThemeSwitcherLarge}>
                <ThemeSwitcher />
              </a>
            </div>
          </div>
          <div className={styles.headerOptionsSmall}>
            <a className={styles.LanguageSwitcherSmall}>
                <LanguageSwitcher />
            </a>
            <a className={styles.ThemeSwitcherSmall}>
              <ThemeSwitcher />
            </a>
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
