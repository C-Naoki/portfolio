import { Client } from '@notionhq/client';
import { Block } from '../types/notion.d';

const databaseId = process.env.NOTION_DATABASE_ID || '';
const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const blocks: Block[] = [];
  let cursor;
  try {
    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      });
      blocks.push(...(results as Block[]));
      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }
  } catch (error) {
    console.error("Error fetching blocks:", error);
  }
  return blocks;
};
