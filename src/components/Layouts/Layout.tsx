import { Container } from '@material-ui/core';
import React from 'react';
import { Toaster } from 'react-hot-toast';


export default function Layout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <Container style={{ marginTop: '95px', maxWidth: '750px', backgroundColor: '#ffffff', paddingTop: '5px'  }}>
      {title && <h1>{title}</h1>}
      {children}
      <Toaster />
    </Container>
  );
}
