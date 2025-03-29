import axios from 'axios'

import type { ZennArticle, Book } from '@/types/blog.d'
import type { NextApiRequest, NextApiResponse } from 'next'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let username
  if (externalLinksInfo.zenn !== undefined && externalLinksInfo.zenn !== null && externalLinksInfo.zenn !== '') {
    const match = externalLinksInfo.zenn.match(/zenn\.dev\/([\w\d_-]+)/)
    if (match !== null) {
      username = match[1]
    } else {
      console.error("The URL doesn't match the expected pattern.")
    }
  } else {
    console.error("'externalLinksInfo.zenn' is null or undefined.")
  }

  try {
    const [articlesResponse, booksResponse] = await Promise.all([
      axios.get(`https://zenn.dev/api/articles?username=${username}&order=latest`),
      axios.get(`https://zenn.dev/api/books?username=${username}&order=latest`)
    ])

    const zennArticles: ZennArticle[] = articlesResponse.data.articles.map((article: ZennArticle) => ({
      ...article,
      published_at: new Date(article.published_at).toISOString()
    }))

    const zennBooks: Book[] = booksResponse.data.books.map((book: Book) => ({
      ...book,
      published_at: new Date(book.published_at).toISOString()
    }))

    res.status(200).json({ zennArticles, zennBooks })
  } catch (error) {
    console.error('Error fetching Zenn articles or books:', error)
    res.status(500).json({ error: 'Failed to fetch articles or books' })
  }
}
