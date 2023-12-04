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
  const blocks = await getBlocks(blogId);

  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          blockId: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block: any) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.blockId === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
