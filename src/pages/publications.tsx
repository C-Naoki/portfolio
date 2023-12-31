import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import styles from '../styles/globals.module.css';

export default function Publications() {
  const { t } = useTranslation();

  return (
    <Layout title={t('publications.heading')}>
      <h2>{t('publications.conference')}</h2>
      <ul>
        <li>
          周期解析による変動天体の検出<br />
          第15回データ工学と情報マネジメントに関するフォーラム (DEIM2023), 4a-6-3, 2023.<br />
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span>, 高田 唯史, 藤原 靖宏, 鬼塚 真<br />
          <a href="/assets/DEIM2023/paper.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>{' '}
          <a href="/assets/DEIM2023/slides.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[slides]</a>{' '}
          <a href="/assets/DEIM2023/poster.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[poster]</a>
        </li>
      </ul>

      <h2>{t('publications.journal')}</h2>
      <ul>
        <li>
          Effective detection of variable celestial objects using machine learning-based periodic analysis<br />
          Astronomy and Computing, Vol. 45, pp. 100765, 3 November 2023.<br />
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Naoki Chihara</span>, Tadafumi Takata, Yasuhiro Fujiwara, Koki Noda, Keisuke Toyoda, Kaito Higuchi, Makoto Onizuka<br />
          <a href="/assets/AstronComput45/paper.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>
        </li>
      </ul>

      <h2>{t('publications.patent')}</h2>
      <ul>
        <li>
          発明等：検出装置、検出⽅法及びプログラム<br />
          発明者：藤原 靖宏, 鬼塚 真, <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span><br />
          出願番号：特願2023-099796<br />
          出願日：2023.06.19<br />
        </li>
      </ul>
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
