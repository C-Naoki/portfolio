import { Button, CircularProgress, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layouts/Layout';
import { addNewContact } from '../reducks/contact/operations';
import styles from '../styles/globals.module.css';

const useStyles = makeStyles((theme) => ({
  customButton: {
    backgroundColor: 'var(--button-bg-color)',
    '&:hover': {
      backgroundColor: 'var(--button-hover-bg-color)',
    },
  },
  customPaper: {
    boxShadow: 'var(--box-shadow)',
  },
  textField: {
    '& .MuiInputBase-input': {
      color: 'var(--text-color)',
    },
    '& label': {
      color: 'var(--placeholder-color)',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'var(--input-border-color)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--input-border-color)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--input-hover-border-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

export default function Contact() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  const [surName, setSurName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(addNewContact(surName, name, email, subject, message) as any);
    const formData = { surName, name, email, subject, message };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        initializeForm();
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const initializeForm = () => {
    setSurName('');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <Layout title={t('contact.heading')}>
      <Grid container justify="center" alignItems="center" style={{ width: '100%', minHeight: '60vh' }}>
        <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper className={classes.customPaper}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label={t('contact.surname')}
                    variant="outlined"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label={t('contact.name')}
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label={t('contact.email')}
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label={t('contact.subject')}
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    label={t('contact.message')}
                    multiline rows={10}
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.customButton}>
                      {t('contact.send')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
