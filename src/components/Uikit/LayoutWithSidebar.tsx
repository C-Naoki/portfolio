import React from 'react'

import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Toaster } from 'react-hot-toast'

const useStyles = makeStyles((theme) => ({
  text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem'
    }
  }
}))

export default function LayoutWithSidebar ({ children, title, sidebarContent }: { children: React.ReactNode, title?: string, sidebarContent: React.ReactNode }): JSX.Element {
  const classes = useStyles()
  return (
    <Container style={{ marginTop: '100px', maxWidth: '1100px' }}>
      {title != null && <h1>{title}</h1>}
      <Grid container spacing={0}>
        <Grid className={classes.text} item xs={12} md={8}>
          {children}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} style={{ padding: '16px' }}>
            {sidebarContent}
          </Paper>
        </Grid>
      </Grid>
      <Toaster />
    </Container>
  )
}
