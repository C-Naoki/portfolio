import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Tag } from '../../types/blog.d';

const notion = new Client({
  auth: process.env.NOTION_SECRET
});

const getPageMetaData = (post: any) => {
  const getTags = (tags: Tag[]) => {
    return tags.map((tag: Tag) => tag.name);
  };
  console.log(typeof post.properties)

  return {
    id: post.id,
    last_edited_time: post.last_edited_time,
    title: post.properties.Name?.title[0]?.plain_text ?? 'No title',
    tags: getTags(post.properties.tag?.multi_select ?? []),
    date: post.properties.Date?.created_time ?? 'No date',
    thumbnail:
      post.properties.image?.files?.[0]?.file?.url ?? null,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const databaseId = process.env.NOTION_DATABASE_ID || '';
    const startCursor = req.query.startCursor as string | undefined;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const validStartCursor = startCursor === '' ? undefined : startCursor;

    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: validStartCursor,
        page_size: pageSize,
        filter: {
          property: 'status',
          status: {
            equals: 'Publish',
          },
        },
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
      });

      const posts = response.results.map(getPageMetaData);

      res.status(200).json({
        posts,
        nextCursor: response.has_more ? response.next_cursor : null,
        pageSize,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
