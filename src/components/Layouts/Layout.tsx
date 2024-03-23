import { Container } from '@material-ui/core';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import styles from '../../styles/layout.module.css';

export default function Layout({ children, title }: { children: React.ReactNode, title?: string }) {
  const childrenCount = React.Children.count(children)
  const gridTemplateColumns = `repeat(${childrenCount}, 1fr)`

  return (
    <Container className={styles.container}>
      {title && <h1>{title}</h1>}
      <div className={styles.layoutGrid} style={{ gridTemplateColumns }}>
        {children}
      </div>
      <Toaster />
    </Container>
  )
}
