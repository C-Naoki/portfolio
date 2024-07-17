import React from 'react'

import { Container } from '@mui/material'
import { Toaster } from 'react-hot-toast'

import ScrollToTopButton from '@/components/Uikit/ScrollToTopButton'

export default function Layout ({ children, title }: { children: React.ReactNode, title: string }): JSX.Element {
  return (
    <Container className='container'>
      <h1>{title}</h1>
      <div>
        {children}
        <ScrollToTopButton />
      </div>
      <Toaster />
    </Container>
  )
}
