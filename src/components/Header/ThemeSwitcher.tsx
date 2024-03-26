import React, { useEffect, useState } from 'react'

import { IconButton } from '@material-ui/core'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeSwitcher: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark'
    setIsDarkMode(isDark)
    setTheme(isDark)
  }, [])

  const setTheme = (isDarkMode: boolean): void => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode)
    setTheme(!isDarkMode)
  }

  return (
    <IconButton color='inherit' onClick={toggleTheme}>
      {isDarkMode ? <FaMoon fontSize='large' /> : <FaSun fontSize='large' />}
    </IconButton>
  )
}

export default ThemeSwitcher
