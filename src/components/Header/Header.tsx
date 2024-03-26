import React, { useState } from 'react'

import { Drawer, IconButton } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Menu as MenuIcon } from '@material-ui/icons'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import styles from '../../styles/header.module.css'

import DrawerContent from '@/components/Header/DrawerContent'
import LanguageSwitcher from '@/components/Header/LanguageSwitcher'
import ThemeSwitcher from '@/components/Header/ThemeSwitcher'
import externalLinks from '@/constants/externalLinks'

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
        <Toolbar className={styles.toolbarCenter}>
          <Typography variant='h6' className={styles.title}>
            Naoki Chihara
          </Typography>
          <div className={styles.headerOptions}>
            <AnimatedButton href='/'>Home</AnimatedButton>
            <AnimatedButton href='/blog-under-construction'>Blog</AnimatedButton>
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
              <a className={styles.LanguageSwitcher}>
                <LanguageSwitcher />
              </a>
              <a className={styles.ThemeSwitcher}>
                <ThemeSwitcher />
              </a>
            </div>
          </div>
          {/*
            TODO: ここら辺若干ダサい気がする
            1. スマホ用とPC用にcssを分ける必要がある。(現状は、headerOptionsがPCようになっている？)
            2. ThemeSwitcherSmallがスマホ用とかではない。IconBottonもスマホの時しか表示されないコンポーネントなはずなので、まとめるべき。
          */}
          <a className={styles.ThemeSwitcherSmall}>
            <ThemeSwitcher />
          </a>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <DrawerContent handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </>
  )
}

export default Header
