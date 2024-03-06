import { Container } from '@material-ui/core';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import styles from '../../styles/layout.module.css';


export default function Layout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <Container className={styles.container}>
      {title && <h1>{title}</h1>}
      {children}
      <Toaster />
    </Container>
  );
}
