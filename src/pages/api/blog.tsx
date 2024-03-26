import { Client } from '@notionhq/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({
  auth: process.env.NOTION_SECRET
})

const getPageMetaData = (post: any): any => {
  const getNames = (comps: any): any => {
    return comps.map((comp: any) => comp.name)
  }

  return {
    id: post.id,
    last_edited_time: post.last_edited_time,
    title: post.properties.Name?.title[0]?.plain_text ?? 'No title',
    tags: getNames(post.properties.tag?.multi_select ?? []),
    authors: getNames(post.properties.authors?.multi_select ?? []),
    date: post.properties.Date?.created_time ?? 'No date',
    thumbnail:
      post.properties.image?.files?.[0]?.file?.url ?? null
  }
}

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    const databaseId = process.env.NOTION_DATABASE_ID != null || ''
    const startCursor = req.query.startCursor as string | undefined
    const pageSize = parseInt(req.query.pageSize as string)

    const validStartCursor = startCursor === '' ? undefined : startCursor

    try {
      const response = await notion.databases.query({
        database_id: databaseId as string,
        start_cursor: validStartCursor,
        page_size: pageSize,
        filter: {
          property: 'status',
          status: {
            equals: 'Publish'
          }
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending'
          }
        ]
      })

      const posts = response.results.map(getPageMetaData)

      res.status(200).json({
        posts,
        nextCursor: response.has_more ? response.next_cursor : null,
        pageSize
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: 'Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
