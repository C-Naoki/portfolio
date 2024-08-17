import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { Article, Book } from '@/types/blog.d'
import type { GetServerSideProps } from 'next'

import ArticleList from '@/components/Blog/ArticleList'
import BookList from '@/components/Blog/BookList'
import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function Blog ({ articles, books }: { articles: Article[], books: Book[] }): JSX.Element {
  const { t } = useTranslation()
  const [visibleArticles, setVisibleArticles] = useState(4)
  const [visibleBooks, setvisibleBooks] = useState(4)

  const articleShowMore = (): void => {
    setVisibleArticles(prev => prev + 4)
  }

  const bookShowMore = (): void => {
    setvisibleBooks(prev => prev + 4)
  }

  return (
    <Layout title={t('blog.heading')}>
      <Section id='article' title={t('blog.article')}>
        <HorizontalLine />
        {articles.slice(0, visibleArticles).map((article, index) => (
          <div key={article.id}>
            <ArticleList article={article} />
            {index < visibleArticles - 1 && index < articles.length - 1 && <HorizontalLine main={false}/>}
          </div>
        ))}
      </Section>
      {visibleArticles < articles.length && (
          <button onClick={articleShowMore} className="show-more-button">
            Show More
          </button>
      )}
      <Section id='book' title={t('blog.book')}>
        <HorizontalLine />
        {books.slice(0, visibleBooks).map((book, index) => (
          <div key={book.id}>
            <BookList book={book} />
            {index < visibleBooks - 1 && index < books.length - 1 && <HorizontalLine main={false}/>}
          </div>
        ))}
      </Section>
      {visibleBooks < books.length && (
          <button onClick={bookShowMore} className="show-more-button">
            Show More
          </button>
      )}
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
