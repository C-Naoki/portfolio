import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_SECRET
});

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });
    return allTags;
  };

  return {
    id: post.id,
    last_edited_time: post.last_edited_time,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.tag.multi_select),
    date: post.properties.Date.created_time,
    thumbnail:
      post.properties.image && post.properties.image.files.length > 0
        ? post.properties.image.files[0].file.url
        : null,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const databaseId = process.env.NOTION_DATABASE_ID || '';
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
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

      const allPosts = response.results;
      const metaData = allPosts.map(post => getPageMetaData(post));

      res.status(200).json(metaData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ status: 'Error', message: error.message });
      } else {
        res.status(500).json({ status: 'Error', message: 'An error occurred.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
