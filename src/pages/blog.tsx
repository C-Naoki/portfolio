import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Uikit/Layout';
import { BlogPost } from '../types/blog.d';

interface BlogProps {
  posts: BlogPost[];
  error?: string;
}

export default function Blog({ posts, error }: BlogProps) {
  const { t } = useTranslation();

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout title={t('blog')}>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <article>
              <h2>{post.title}</h2>
              {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" />}
              <p>{post.description}</p>
              <div>Tags: {post.tags.join(', ')}</div>
              <div>Last Edited: {new Date(post.last_edited_time).toLocaleDateString()}</div>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  let posts: BlogPost[] = [];
  let error: string | null = null; // デフォルト値をnullに設定

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, { // 環境変数を使用
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      error = `Failed to fetch blog posts: ${response.status} ${response.statusText}`;
    } else {
      posts = await response.json();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      error,
    },
  };
}
