import React, { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import DrawerContent from './DrawerContent'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

import externalLinks from '@/constants/externalLinks'
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
    <>
      <AppBar position='fixed' className={styles.appBar}>
        <Toolbar>
          <Typography variant='h6' className={styles.title}>
            Naoki Chihara
          </Typography>
          <div className={styles.headerOptionsLarge}>
            <AnimatedButton href='/'>Home</AnimatedButton>
            <AnimatedButton href='https://zenn.dev/naoki0103'>Blog</AnimatedButton>
            <AnimatedButton href='/publications'>Publications</AnimatedButton>
            <AnimatedButton href='/contact'>Contact</AnimatedButton>
            <div className={styles.toolbarCenter}>
              <a href={externalLinks.github} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter}>
                <FaGithub className={styles.headerIcon} />
              </a>
              <a href={externalLinks.twitter} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter}>
                <FaTwitter className={styles.headerIcon} />
              </a>
              <a href={externalLinks.linkedin} target='_blank' rel='noopener noreferrer' className={styles.toolbarCenter}>
                <FaLinkedin className={styles.headerIcon} />
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
    </>
  )
}

export default Header
