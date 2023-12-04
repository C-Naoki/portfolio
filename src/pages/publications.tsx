import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import styles from '../styles/globals.module.css';
import { LocaleOnlyContext as Context } from '../types/ssg.d';

export default function Publications() {
  const { t } = useTranslation();

  return (
    <Layout title={t('publications')}>
      <h2>{t('conference')}</h2>
      <ol>
        <li>
          周期解析による変動天体の検出<br />
          第15回データ工学と情報マネジメントに関するフォーラム (DEIM2023), 2023.<br />
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span>, 高田 唯史, 藤原 靖宏, 鬼塚 真<br />
          <a href="https://firebasestorage.googleapis.com/v0/b/portfolio-29cb4.appspot.com/o/deim2023%2Fpaper.pdf?alt=media&token=494477cf-dcc0-4aac-b546-ee25553dab8f" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>{' '}
          <a href="https://firebasestorage.googleapis.com/v0/b/portfolio-29cb4.appspot.com/o/deim2023%2Fslides.pdf?alt=media&token=45e0e3f8-d602-43b8-b490-32c3fa60aad4" target="_blank" rel="noopener noreferrer" className={styles.link}>[slides]</a>{' '}
          <a href="https://firebasestorage.googleapis.com/v0/b/portfolio-29cb4.appspot.com/o/deim2023%2Fposter.pdf?alt=media&token=29a0c9be-120e-4faa-94bd-c974fe0dc8c8" target="_blank" rel="noopener noreferrer" className={styles.link}>[poster]</a>
        </li>
      </ol>

      <h2>{t('journal')}</h2>
      <ol>
        <li>
          Effective detection of variable celestial objects using machine learning-based periodic analysis<br />
          Astronomy and Computing, Vol. 45, pp. 100765, 3 November 2023.<br />
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Naoki Chihara</span>, Tadafumi Takata, Yasuhiro Fujiwara, Koki Noda, Keisuke Toyoda, Kaito Higuchi, Makoto Onizuka<br />
          <a href="https://firebasestorage.googleapis.com/v0/b/portfolio-29cb4.appspot.com/o/astronomy%20and%20computing2023%2Fpaper.pdf?alt=media&token=e6539daa-8030-47b5-b134-e5e20d77ad3d" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>
        </li>
      </ol>

      <h2>{t('patent')}</h2>
      <ol>
        <li>
          発明等：検出装置、検出⽅法及びプログラム<br />
          発明者：藤原 靖宏, 鬼塚 真, <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span><br />
          出願番号：特願2023-099796<br />
          出願日：2023.06.19<br />
        </li>
      </ol>
    </Layout>
  );
};

export async function getStaticProps({ context }: { context: Context }) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
    revalidate: 60,
  };
}
