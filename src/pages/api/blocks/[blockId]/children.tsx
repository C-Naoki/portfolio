import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blockId } = req.query;

  try {
    const childrenBlocks = await notion.blocks.children.list({
      block_id: blockId as string,
    });

    res.status(200).json(childrenBlocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch children blocks' });
  }
}
