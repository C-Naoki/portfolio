import { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NodeCache from 'node-cache'

import type { Book, QiitaArticle, ZennArticle } from '@/types/blog.d'
import type { GetServerSideProps } from 'next'

import ArticleList from '@/components/Blog/ArticleList'
import BookList from '@/components/Blog/BookList'
import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

const cache = new NodeCache({ stdTTL: 3600 })

export default function Blog ({ articles, books, searchValue }: { articles: Array<[ZennArticle, QiitaArticle]>, books: Book[], searchValue?: string }): JSX.Element {
  const { t } = useTranslation()
  const [visibleArticles, setVisibleArticles] = useState(4)
  const [visibleBooks, setvisibleBooks] = useState(4)

  // 検索フィルタ
  const filteredArticles = typeof searchValue === 'string' && searchValue.trim() !== ''
    ? articles.filter(([zenn, qiita]) =>
      (zenn?.title?.toLowerCase().includes(searchValue.toLowerCase()) ?? false) ||
        (qiita?.title?.toLowerCase().includes(searchValue.toLowerCase()) ?? false)
    )
    : articles
  const filteredBooks = typeof searchValue === 'string' && searchValue.trim() !== ''
    ? books.filter(book => book.title?.toLowerCase().includes(searchValue.toLowerCase()))
    : books

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
        {filteredArticles.slice(0, visibleArticles).map(([zennArticle, qiitaArticle], index) => {
          let key: string
          if (typeof zennArticle?.id === 'number') {
            key = `zenn-${zennArticle.id}`
          } else if (typeof qiitaArticle?.id === 'string' && qiitaArticle.id !== '') {
            key = `qiita-${qiitaArticle.id}`
          } else {
            key = `article-${index}`
          }
          return (
            <div key={key}>
              <ArticleList zennArticle={zennArticle} qiitaArticle={qiitaArticle} />
              {index < visibleArticles - 1 && index < filteredArticles.length - 1 && <HorizontalLine main={false}/>}
            </div>
          )
        })}
      </Section>
      {visibleArticles < filteredArticles.length && (
          <button onClick={articleShowMore} className="show-more-button">
            Show More
          </button>
      )}
      <Section id='book' title={t('blog.book')}>
        <HorizontalLine />
        {filteredBooks.slice(0, visibleBooks).map((book, index) => (
          <div key={book.id}>
            <BookList book={book} />
            {index < visibleBooks - 1 && index < filteredBooks.length - 1 && <HorizontalLine main={false}/>}
          </div>
        ))}
      </Section>
      {visibleBooks < filteredBooks.length && (
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

  const cachedZennArticles = cache.get<ZennArticle[]>('zennArticles')
  const cachedZennBooks = cache.get<Book[]>('zennBooks')
  const cachedQiitaArticles = cache.get<QiitaArticle[]>('qiitaArticles')

  if (Array.isArray(cachedZennArticles) && Array.isArray(cachedZennBooks) && Array.isArray(cachedQiitaArticles)) {
    return {
      props: {
        zennArticles: cachedZennArticles,
        zennBooks: cachedZennBooks,
        qiitaArticles: cachedQiitaArticles,
        ...translations
      }
    }
  }

  try {
    const zennRes = await fetch(`${baseUrl}/api/zenn`)
    const qiitaRes = await fetch(`${baseUrl}/api/qiita`)
    const { zennArticles, zennBooks }: { zennArticles: ZennArticle[], zennBooks: Book[] } = await zennRes.json()
    const { qiitaArticles }: { qiitaArticles: QiitaArticle[] } = await qiitaRes.json()
    const articles = zip(zennArticles, qiitaArticles)

    return {
      props: {
        articles,
        books: zennBooks,
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

function zip<T, U> (arr1: T[], arr2: U[]): Array<[T | undefined, U | undefined]> {
  const maxLength = Math.max(arr1.length, arr2.length)
  return Array.from({ length: maxLength }, (_, i) => [arr1[i], arr2[i]])
}
