import { Button, CircularProgress, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Uikit/Layout';
import { addNewContact } from '../reducks/contact/operations';


const useStyles = makeStyles((theme) => ({
  customButton: {
    backgroundColor: '#ff8809',
    '&:hover': {
      backgroundColor: '#be6c15',
    },
  },
}));

export default function Contact() {
  const classes = useStyles();
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
    await initializeForm();
  };

  const initializeForm = () => {
    setSurName('');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <Layout title={t('contact')}>
      <Grid container justify="center" alignItems="center" style={{ width: '100%', minHeight: '60vh' }}>
        <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ padding: '20px', margin: '0 auto'}}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('surname')}
                    variant="outlined"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('name')}
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('email')}
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('subject')}
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('message')}
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
                    className={classes.customButton}>{t('send')}
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

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
