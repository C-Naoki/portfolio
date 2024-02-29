import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layouts/Layout';
import styles from '../styles/globals.module.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout title={t('title')}>
      <p dangerouslySetInnerHTML={{ __html: t('welcome').replace(/\n/g, '<br>') }} />
      <h2>{t('affiliation.heading')}</h2>
      <div className={styles.links}>
        <a href="https://www.dm.sanken.osaka-u.ac.jp/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('affiliation.laboratory')}</a><br />
        <a href="https://www.sanken.osaka-u.ac.jp/en/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('affiliation.SANKEN')}</a><br />
        <a href="https://www.ist.osaka-u.ac.jp/english/" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('affiliation.graduate')}</a><br />
        <a href="https://www.osaka-u.ac.jp/en" target="_blank" rel="noopener noreferrer" className={styles.link}>{t('affiliation.university')}</a><br />
      </div>
      <p>
        {t('affiliation.address')}<br />
        Email: naoki88[at]sanken.osaka-u.ac.jp
      </p>
      <h2>{t('grants.heading')}</h2>
      <ul>
        <li>
          {t('grants.hwip year')}: {t('grants.hwip name')}<br />
        </li>
      </ul>
      <h2>{t('experiences.heading')}</h2>
      <ul>
        <li>
          {t('experiences.sanken year')}: {t('experiences.sanken name')}<br />
        </li>
        <li>
          {t('experiences.TA year')}: {t('experiences.TA name')}<br />
        </li>
        <li>
          {t('experiences.nagase year')}: {t('experiences.nagase name')}<br />
        </li>
      </ul>
      <h2>{t('education.heading')}</h2>
      <ul>
        <li>
          {t('education.M.Sc. year')}: {t('education.M.Sc.')}<br />
          <span dangerouslySetInnerHTML={{ __html: t('education.M.Sc. name').replace(/\n/g, '<br>') }} /><br />
        </li>
        <li>
          {t('education.B.Sc. year')}: {t('education.B.Sc.')}<br />
          <span dangerouslySetInnerHTML={{ __html: t('education.B.Sc. name').replace(/\n/g, '<br>') }} /><br />
        </li>
        <li>
          {t('education.secondary year')}: {t('education.secondary')}<br />
          {t('education.secondary name')}
        </li>
      </ul>
      <h2>{t('misc.heading')}</h2>
      <ul>
        <li>
          <div className={styles.links}>
          <a href="https://pandacco.web.app/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            {t('misc.pandacco')}
          </a> <i>-- developer</i><br />
          Google Developer Student Clubs (GDSC) <br />
          </div>
        </li>
      </ul>
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
