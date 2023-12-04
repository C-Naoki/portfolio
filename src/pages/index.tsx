import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import styles from '../styles/globals.module.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout title={t('title')}>
      <p dangerouslySetInnerHTML={{ __html: t('welcome').replace(/\n/g, '<br>') }} />
      <h2>{t('affiliation')}</h2>
      <div className={styles.links}>
        <a href="https://www.dm.sanken.osaka-u.ac.jp/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('laboratory')}</a><br />
        <a href="https://www.sanken.osaka-u.ac.jp/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('SANKEN')}</a><br />
        <a href="https://www.ist.osaka-u.ac.jp/english/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('graduate')}</a><br />
        <a href="https://www.osaka-u.ac.jp/en" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('university')}</a><br />
      </div>
      <p>
        {t('address')}<br />
        Email: naoki88[at]sanken.osaka-u.ac.jp
      </p>
      <h2>{t('education')}</h2>
        {t('M.Sc. year')}: {t('M.Sc.')}<br />
        {t('M.Sc. name')}<br />
        {t('B.Sc. year')}: {t('B.Sc.')}<br />
        {t('B.Sc. name')}<br />
        {t('secondary year')}: {t('secondary')}<br />
        {t('secondary name')}
    </Layout>
    );
  }

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
