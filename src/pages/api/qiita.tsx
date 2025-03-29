import axios from 'axios'

import type { QiitaArticle } from '@/types/blog.d'
import type { NextApiRequest, NextApiResponse } from 'next'

import externalLinksInfo from '@/constants/externalLinksInfo'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let username
  if (externalLinksInfo.qiita !== undefined && externalLinksInfo.qiita !== null && externalLinksInfo.qiita !== '') {
    const match = externalLinksInfo.qiita.match(/qiita\.com\/([\w\d_-]+)/)
    if (match !== null) {
      username = match[1]
    } else {
      console.error("The URL doesn't match the expected pattern.")
    }
  } else {
    console.error("'externalLinksInfo.qiita' is null or undefined.")
  }

  try {
    const [articlesResponse] = await Promise.all([
      axios.get(`https://qiita.com/api/v2/items?page=1&per_page=100&query=user:${username}`)
    ])

    const qiitaArticles: QiitaArticle[] = articlesResponse.data.map((article: QiitaArticle) => ({
      ...article,
      published_at: new Date(article.created_at).toISOString()
    }))

    res.status(200).json({ qiitaArticles })
  } catch (error) {
    console.error('Error fetching Qiita articles:', error)
    res.status(500).json({ error: 'Failed to fetch articles or books' })
  }
}
