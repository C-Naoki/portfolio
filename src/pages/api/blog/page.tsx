import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({ auth: process.env.NOTION_SECRET });
const databaseId = process.env.NOTION_DATABASE_ID || '';

export default async function getPaginationPaths(req: NextApiRequest, res: NextApiResponse) {
  try {
    let cursor: string | undefined = undefined;
    let paths = [];
    let isFirstPage = true;

    while (true) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: cursor,
        page_size: 10,
      });

      if (isFirstPage) {
        paths.push({ params: { cursor: 'first' }});
        isFirstPage = false;
      } else if (cursor) {
        paths.push({ params: { cursor: cursor }});
      }

      if (!response.has_more) break;

      cursor = response.next_cursor ?? undefined;
    }

    res.status(200).json(paths);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
  }
}
