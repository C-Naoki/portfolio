import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import BlogPost from '../components/Uikit/BlogPost';
import Layout from '../components/Uikit/Layout';
import styles from '../styles/blog.module.css';
import { useEffect, useState } from 'react';
import { Post } from '../types/blog.d';

export default function Blog({ initialPosts, initialNextCursor }: { initialPosts: Post[], initialNextCursor: string | null }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [cachedPosts, setCachedPosts] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const { cursor } = router.query;
    const cursorString = typeof cursor === 'string' ? cursor : '';
    if (!cursor || cursorString === 'first') {
      fetchInitialData();
    } else if (cachedPosts[cursorString]) {
      setPosts(cachedPosts[cursorString].posts);
      setNextCursor(cachedPosts[cursorString].nextCursor);
    } else {
      const fetchData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?startCursor=${cursorString}`);
        const data = await response.json();
        setPosts(data.posts);
        setNextCursor(data.nextCursor);

        setCachedPosts(prev => ({ ...prev, [cursorString]: data }));
      };
      fetchData().catch(console.error);
    }
  }, [router.query.cursor, cachedPosts]);

  const handlePagination = (cursor: string) => {
    if (cursor !== '') {
      router.push(`/blog?cursor=${cursor}`, undefined, { shallow: false });
    } else {
      fetchInitialData();
      router.push(`/blog`, undefined, { shallow: false });
    }
  };

  const fetchInitialData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
    const data = await response.json();
    setPosts(data.posts);
    setNextCursor(data.nextCursor);
  };

  return (
    <Layout title={t('blog')}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePagination('')}>First Page</button>
        {nextCursor && (
          <button onClick={() => handlePagination(nextCursor)}>Next Page</button>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  let initialPosts = [];
  let initialNextCursor = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
    const data = await response.json();
    initialPosts = data.posts;
    initialNextCursor = data.nextCursor;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      initialPosts,
      initialNextCursor,
    },
    revalidate: 60,
  };
}
