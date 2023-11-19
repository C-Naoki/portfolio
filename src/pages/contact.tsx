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
      <Grid container justify="center" alignItems="center" style={{ minHeight: '10vh' }}>
        <Grid item>
          <Paper style={{ padding: '20px', marginTop: '40px', width: '600px' }}>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="姓" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="名" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="メールアドレス" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="件名" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="内容" multiline rows={4} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>送信</Button>
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
