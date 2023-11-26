import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import LayoutWithSidebar from '../../components/Uikit/LayoutWithSidebar';
import SidebarContent from '../../components/Uikit/SidebarContent';
import { renderBlock } from '../../lib/render';
import { Block } from '../../types/blog.d';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BlogPostPage = ({ postContent }: { postContent: { title: string,  results: Block[] } }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { title, ...postContentWithoutTitle } = postContent;

  useEffect(() => {
    const fetchBlocks = async () => {
      const fetchedBlocks = await Promise.all(
        postContentWithoutTitle.results.map(async (block) => {
          if (block.has_children) {
            const children = await fetchChildrenBlocks(block.id);
            return { ...block, children };
          }
          return block;
        })
      );
      setBlocks(fetchedBlocks);
    };

    fetchBlocks();
  }, [postContentWithoutTitle.results]);

  return (
    <LayoutWithSidebar title={postContent.title} sidebarContent={<SidebarContent />}>
      <div>
        {blocks.map((block) => renderBlock(block, block.children))}
      </div>
    </LayoutWithSidebar>
  );
};

async function fetchChildrenBlocks(blockId: string): Promise<Block[]> {
  const response = await fetch(`/api/blocks/${blockId}/children`);
  const data = await response.json();
  return data.results;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale!;
  const { blogId } = context.params as { blogId: string };
  const res = await fetch(`http://localhost:3000/api/blog/${blogId}`);
  const postContent = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
      postContent,
    },
  };
};

export default BlogPostPage;
