import { Client } from '@notionhq/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NOTION_SECRET })
const databaseId = process.env.NOTION_DATABASE_ID != null || ''

export default async function getPaginationPaths (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    let cursor: string | undefined
    const paths = []
    let isFirstPage = true

    while (true) {
      const response = await notion.databases.query({
        database_id: databaseId as string,
        start_cursor: cursor,
        page_size: 10
      })

      if (isFirstPage) {
        paths.push({ params: { cursor: 'first' } })
        isFirstPage = false
      } else if (cursor != null) {
        paths.push({ params: { cursor } })
      }

      if (!response.has_more) break

      cursor = response.next_cursor ?? undefined
    }

    res.status(200).json(paths)
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' })
  }
}
