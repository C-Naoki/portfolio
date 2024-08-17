import axios from 'axios'

import type { Article, Book } from '@/types/blog.d'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const [articlesResponse, booksResponse] = await Promise.all([
      axios.get('https://zenn.dev/api/articles?username=naoki0103&order=latest'),
      axios.get('https://zenn.dev/api/books?username=naoki0103&order=latest')
    ])

    const articles: Article[] = articlesResponse.data.articles.map((article: Article) => ({
      ...article,
      published_at: new Date(article.published_at).toISOString()
    }))

    const books: Book[] = booksResponse.data.books.map((book: Book) => ({
      ...book,
      published_at: new Date(book.published_at).toISOString()
    }))

    res.status(200).json({ articles, books })
  } catch (error) {
    console.error('Error fetching Zenn articles or books:', error)
    res.status(500).json({ error: 'Failed to fetch articles or books' })
  }
}
