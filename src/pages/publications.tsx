import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layouts/Layout';
import HorizontalLine from '../components/Uikit/HorizontalLine';
import styles from '../styles/globals.module.css';

export default function Publications() {
  const { t } = useTranslation();

  return (
    <Layout title={t('publications.heading')}>
      <div className={styles.section}>
        <h2>{t('publications.conference')}</h2>
        <HorizontalLine />
        <ul>
          <li>
            動的モード分解を活用した高速将来予測アルゴリズム<br />
            第16回データ工学と情報マネジメントに関するフォーラム (DEIM2024), T2-B-6-02, 2024.<br />
            <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span>, 松原 靖子, 藤原 廉, 櫻井 保志<br />
            <a href="/assets/DEIM2024/paper.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>{' '}
            <a href="/assets/DEIM2024/slides.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[slides]</a>{' '}
            <a href="/assets/DEIM2024/poster.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[poster]</a>
          </li>
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
        <HorizontalLine />
        <ul>
          <li>
            Effective detection of variable celestial objects using machine learning-based periodic analysis<br />
            <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Naoki Chihara</span>, Tadafumi Takata, Yasuhiro Fujiwara, Koki Noda, Keisuke Toyoda, Kaito Higuchi, Makoto Onizuka<br />
            Astronomy and Computing, Vol. 45, pp. 100765, 3 November 2023.<br />
            <a href="/assets/AstronComput45/paper.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>[paper]</a>
          </li>
        </ul>

        <h2>{t('publications.patent')}</h2>
        <HorizontalLine />
        <ul>
          <li>
            発明等：検出装置、検出⽅法及びプログラム<br />
            発明者：藤原 靖宏, 鬼塚 真, <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span><br />
            出願番号：特願2023-099796<br />
            出願日：2023.06.19<br />
          </li>
        </ul>
      </div>
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
