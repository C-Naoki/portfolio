import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { Toaster } from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
}));

export default function LayoutWithSidebar({ children, title, sidebarContent }: { children: React.ReactNode, title?: string, sidebarContent: React.ReactNode }) {
  const classes = useStyles();
  return (
    <Container style={{ marginTop: '100px', maxWidth: '1100px' }}>
      {title && <h1>{title}</h1>}
      <Grid container spacing={3}>
        <Grid className={classes.text} item xs={12} md={9}>
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
