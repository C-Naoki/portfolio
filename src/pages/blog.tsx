import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import blogPosts from '../data/blogPosts';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <Layout title={t('blog')}>
      <h2> {t('preparation')} </h2>
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
