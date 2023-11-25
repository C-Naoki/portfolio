import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import BlogPost from '../components/Uikit/BlogPost';
import Layout from '../components/Uikit/Layout';
import { Post } from '../types/blog.d';

interface BlogProps {
  posts: Post[];
  error?: string;
  nextCursor?: string | null;
}

export default function Blog({ posts, error, nextCursor }: BlogProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const handlePagination = (cursor: string | null | undefined) => {
    router.push({
      pathname: '/blog',
      query: { startCursor: cursor },
    });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout title={t('blog')}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      <div>
        <button onClick={() => handlePagination(null)} disabled={!router.query.startCursor}>
          First Page
        </button>
        <button onClick={() => handlePagination(nextCursor)} disabled={!nextCursor}>
          Next Page
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ locale, query }: { locale: string; query: any }) {
  let posts: Post[] = [];
  let error: string | null = null;
  let nextCursor: string | null = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?startCursor=${query.startCursor || ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      error = `Failed to fetch blog posts: ${response.status} ${response.statusText}`;
    } else {
      const data = await response.json();
      posts = data.posts;
      nextCursor = data.nextCursor;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts,
      error,
      nextCursor,
    },
  };
}
