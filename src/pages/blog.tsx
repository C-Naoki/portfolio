import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import blogPosts from '../data/blogPosts';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <Layout title={t('blog')}>
      <div>
        {blogPosts.map(post => (
          <div key={post.id}>
            <img src={post.thumbnail} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
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
