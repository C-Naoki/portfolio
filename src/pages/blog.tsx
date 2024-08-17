import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { Article, Book } from '@/types/blog.d'
import type { GetServerSideProps } from 'next'

import ArticleList from '@/components/Blog/ArticleList'
import BookList from '@/components/Blog/BookList'
import Layout from '@/components/Layouts/Layout'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function Blog ({ articles, books }: { articles: Article[], books: Book[] }): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('blog.heading')}>
      <section className="section" id='article'>
        <h2>{t('blog.article')}</h2>
        <HorizontalLine />
        {articles.map((article, index) => (
          <div key={article.id}>
            <ArticleList key={article.id} article={article} />
            {index < articles.length - 1 && <HorizontalLine main={false}/>}
          </div>
        ))}
      </section>
      <section className="section" id='book'>
        <h2>{t('blog.book')}</h2>
        <HorizontalLine />
        {books.map((book, index) => (
          <div key={book.id}>
            <BookList key={book.id} book={book} />
            {index < books.length - 1 && <HorizontalLine main={false}/>}
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = context.req.headers.host
  const baseUrl = `${protocol}://${host}`
  const translations = await serverSideTranslations(context.locale ?? 'ja', ['common'])

  try {
    const res = await fetch(`${baseUrl}/api/blog`)
    const { articles, books }: { articles: Article[], books: Book[] } = await res.json()

    return {
      props: {
        articles,
        books,
        ...translations
      }
    }
  } catch (error) {
    console.error('Error fetching articles and books from API:', error)
    return {
      props: {
        articles: [],
        books: [],
        ...translations
      }
    }
  }
}
