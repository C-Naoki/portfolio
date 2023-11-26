import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blogId } = req.query;

  if (!blogId || typeof blogId !== 'string' || blogId.trim() === '') {
    return res.status(400).json({ message: 'Invalid or missing page ID' });
  }

  if (req.method === 'GET') {
    try {
      const response = await notion.pages.retrieve({
        page_id: blogId as string,
      });
      if ("properties" in response && "Name" in response.properties) {
        const nameProperty = response.properties["Name"];
        if (nameProperty && nameProperty.type === 'title' && nameProperty.title.length > 0) {
          const pageTitle = nameProperty.title[0].plain_text;
          const pageBlocks = await notion.blocks.children.list({
            block_id: blogId as string,
          });
          res.status(200).json({
            title: pageTitle,
            results: pageBlocks.results
          });
        } else {
          throw new Error('Title property is not in expected format.');
        }
      } else {
        throw new Error('Response object does not contain properties.');
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
      res.status(500).json({
        status: 'Error',
        message: 'Failed to retrieve page content',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
