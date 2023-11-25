import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Uikit/Layout';
import { Block } from '../../types/blog.d';
import { renderBlock } from '../../lib/render';

const BlogPostPage = ({ postContent }: { postContent: { results: Block[] } }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const fetchedBlocks = await Promise.all(
        postContent.results.map(async (block) => {
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
  }, [postContent.results]);

  return (
    <Layout title='title'>
      <div>
        {blocks.map((block) => renderBlock(block, block.children))}
      </div>
    </Layout>
  );
};

async function fetchChildrenBlocks(blockId: string): Promise<Block[]> {
  const response = await fetch(`/api/blocks/${blockId}/children`);
  const data = await response.json();
  return data.results;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { blogId } = context.params as { blogId: string };
  const res = await fetch(`http://localhost:3000/api/blog/${blogId}`);
  const postContent = await res.json();
  return {
    props: { postContent },
  };
};

export default BlogPostPage;
