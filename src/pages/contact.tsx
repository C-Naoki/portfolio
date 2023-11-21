import { Button, CircularProgress, Grid, Paper, TextField } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import Layout from '../components/Uikit/Layout';

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <Layout title={t('contact')}>
      <Grid container justify="center" alignItems="center" style={{ width: '100%', minHeight: '60vh' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ padding: '20px', margin: '0 auto'}}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label={t('surname')} variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label={t('name')} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label={t('email')} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label={t('subject')} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label={t('message')} multiline rows={15} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>{t('send')}</Button>
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
