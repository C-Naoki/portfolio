import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';

export default function LayoutWithSidebar({ children, title, sidebarContent }: { children: React.ReactNode, title?: string, sidebarContent: React.ReactNode }) {
  return (
    <Container style={{ marginTop: '100px', maxWidth: '1100px' }}>
      {title && <h1>{title}</h1>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {children}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={0} style={{ padding: '16px' }}>
            {sidebarContent}
          </Paper>
        </Grid>
      </Grid>
      <Toaster />
    </Container>
  );
}
