import React from 'react'

import { Container } from '@mui/material'
import { Toaster } from 'react-hot-toast'

import styles from '@/styles/layout.module.css'

export default function Layout ({ children, title }: { children: React.ReactNode, title: string }): JSX.Element {
  const childrenCount = React.Children.count(children)
  const gridTemplateColumns = `repeat(${childrenCount}, 1fr)`

  return (
    <Container className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.layoutGrid} style={{ gridTemplateColumns }}>
        {children}
      </div>
      <Toaster />
    </Container>
  )
}
