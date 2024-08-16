import { useEffect, useState } from 'react'

import { Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import type { AnyAction } from 'redux'
import type { ThunkDispatch } from 'redux-thunk'

import Layout from '@/components/Layouts/Layout'
import { addNewContact } from '@/reducks/contact/operations'
import styles from '@/styles/contact.module.css'

export default function Contact (): JSX.Element {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()

  const [surName, setSurName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <CircularProgress />
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const addContactResult = await (dispatch as ThunkDispatch<any, null, AnyAction>)(addNewContact(surName, name, email, subject, message, t))
    if (!addContactResult.success) {
      console.error('Contact addition failed', addContactResult.error)
      return
    }

    const formData = { surName, name, email, subject, message }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        initializeForm()
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  const initializeForm = (): void => {
    setSurName('')
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <Layout title={t('contact.heading')}>
      <Grid container justifyContent="center" alignItems="center" className={styles.gridContainer}>
        <Grid item xs={10} className={styles.gridItem}>
          <Paper className={styles.paper}>
            <form noValidate autoComplete="off" onSubmit={(event) => { void handleSubmit(event) }} className={styles.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('contact.surname')}
                    variant="outlined"
                    value={surName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSurName(e.target.value) }}
                    className={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('contact.name')}
                    variant="outlined"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                    className={styles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contact.email')}
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                    className={styles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contact.subject')}
                    variant="outlined"
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubject(e.target.value) }}
                    className={styles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contact.message')}
                    multiline rows={10}
                    variant="outlined"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }}
                    className={styles.textField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth type="submit" variant="contained" color="primary" className={styles.button}>
                    <span>{t('contact.send')}</span>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
};

export async function getStaticProps ({ locale }: { locale: string }): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 60
  }
}
