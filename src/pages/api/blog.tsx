import axios from 'axios'

import type { Article } from '@/types/blog.d'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const response = await axios.get('https://zenn.dev/api/articles?username=naoki0103&order=latest')
    const articles: Article[] = response.data.articles.map((article: Article) => ({
      ...article,
      published_at: new Date(article.published_at).toISOString()
    }))

    res.status(200).json({ articles })
  } catch (error) {
    console.error('Error fetching Zenn articles:', error)
    res.status(500).json({ error: 'Failed to fetch articles' })
  }
}
