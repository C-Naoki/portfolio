import React from 'react';
import { Container } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';


export default function Layout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      {title && <h1>{title}</h1>}
      {children}
      <Toaster />
    </Container>
  );
}
