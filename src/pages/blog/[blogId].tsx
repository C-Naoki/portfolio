import LayoutWithSidebar from '../../components/Uikit/LayoutWithSidebar';
import SidebarContent from '../../components/Uikit/SidebarContent';
import { getBlocks, getDatabase, getPage } from '../../lib/notion';
import { renderBlock } from '../../lib/render';
import { Block } from '../../types/notion.d';
import { BlogIdContext as Context } from '../../types/ssg.d';

export default function BlogPostPage ({ page, blocks }: { page: any, blocks: Block[] }) {
  if (!page || !blocks) {
    return <div />;
  }
  return (
    <LayoutWithSidebar title={page.properties.Name.title[0].plain_text} sidebarContent={<SidebarContent />}>
      <div>
        {blocks.map((block) => renderBlock(block))}
      </div>
    </LayoutWithSidebar>
  );
};

async function fetchChildBlocks(blockId: string): Promise<Block[]> {
  let childBlocks = await getBlocks(blockId);
  for (let i = 0; i < childBlocks.length; i++) {
    if (childBlocks[i].has_children) {
      childBlocks[i][childBlocks[i].type] = {
        ...childBlocks[i][childBlocks[i].type],
        children: await fetchChildBlocks(childBlocks[i].id),
      };
    }
  }
  return childBlocks;
}

export const getStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({
      params: {
        blogId: page.id
      }
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: Context) => {
  const { blogId } = context.params;
  const page = await getPage(blogId);
  let blocks = await getBlocks(blogId);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].has_children) {
      blocks[i][blocks[i].type] = {
        ...blocks[i][blocks[i].type],
        children: await fetchChildBlocks(blocks[i].id),
      };
    }
  }

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  };
};
