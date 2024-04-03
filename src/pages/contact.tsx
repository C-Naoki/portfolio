import { useEffect, useState } from 'react'

import { Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'

import type { AnyAction } from 'redux'
import type { ThunkDispatch } from 'redux-thunk'

import Layout from '@/components/Layouts/Layout'
import { addNewContact } from '@/reducks/contact/operations'
import styles from '@/styles/contact.module.css'

const CustomButton = styled(Button)({
  backgroundColor: 'var(--button-bg-color)',
  '&:hover': {
    backgroundColor: 'var(--button-hover-bg-color)'
  }
})

const CustomPaper = styled(Paper)({
  boxShadow: 'var(--box-shadow)'
})

const CustomTextField = styled(TextField)({
  // MuiInputBase-input: 入力した内容の文字色
  '& .MuiInputBase-input': {
    color: 'var(--text-color)'
  },
  // label: プレースホルダーの文字色
  '& label': {
    color: 'var(--placeholder-color)'
  },
  '& label.Mui-focused': {
    color: 'var(--main-color)'
  },
  // MuiInput-underline:before: 下線の色
  '& .MuiInput-underline:before': {
    borderBottomColor: 'var(--input-border-color)'
  },
  // MuiOutlinedInput-root: 枠線の色
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--input-border-color)',
      transition: 'border-color 0.5s'
    },
    '&:hover fieldset': {
      borderColor: 'var(--main-color)',
      borderWidth: '2px'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--main-color)'
    }
  }
})

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
    const addContactResult = await (dispatch as ThunkDispatch<any, null, AnyAction>)(addNewContact(surName, name, email, subject, message))
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
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '30px', width: '100%', minHeight: '60vh' }}>
        <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>
          <CustomPaper>
            <form noValidate autoComplete="off" onSubmit={() => { void handleSubmit }} className={styles.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label={t('contact.surname')}
                    variant="outlined"
                    value={surName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSurName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    label={t('contact.name')}
                    variant="outlined"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={t('contact.email')}
                    variant="outlined"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={t('contact.subject')}
                    variant="outlined"
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubject(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label={t('contact.message')}
                    multiline rows={10}
                    variant="outlined"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary">
                      {t('contact.send')}
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </CustomPaper>
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
