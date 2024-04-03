import React, { useState } from 'react'

import { IconButton, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import { FaGlobe } from 'react-icons/fa'

const LanguageSwitcher = (): JSX.Element => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = (): void => {
    setAnchorEl(null)
  }

  const handleLocaleMenuItemClick = (locale: string): void => {
    void router.push(router.pathname, router.asPath, { locale })
    handleCloseMenu()
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleMenu}>
        <FaGlobe fontSize='large' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => { handleLocaleMenuItemClick('en') }}>🇺🇸 English</MenuItem>
        <MenuItem onClick={() => { handleLocaleMenuItemClick('ja') }}>🇯🇵 日本語</MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
