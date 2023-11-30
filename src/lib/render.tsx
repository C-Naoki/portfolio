import { BlockMath, InlineMath } from 'react-katex';
import { Block, TextItem } from '../types/blog.d';

export const renderBlock = (block: Block, classes: Record<string, string>, childrenBlocks?: Block[]): JSX.Element | null => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return <li key={id}>{value.rich_text.map(renderTextItem)}</li>;
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      const Tag = type === 'heading_1' ? 'h1' : type === 'heading_2' ? 'h2' : 'h3';
      return (
        <Tag key={id}>
          {value.rich_text.map((textItem: TextItem) => textItem.plain_text).join('')}
        </Tag>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={id}>
          {value.rich_text.map(renderTextItem)}
          {block.has_children && childrenBlocks && (
            <ul style={{marginTop: '0px', marginBlock: '0px'}}>{childrenBlocks.map((childBlock) => renderBlock(childBlock, childBlock.children))}</ul>
          )}
        </li>
      );
    case 'image':
      const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
      };
      const imageUrl = value.file?.url || value.external?.url;
      return imageUrl ? (
        <img
          key={id}
          src={imageUrl}
          alt={value.caption?.[0]?.plain_text || ''}
          style={imageStyle}
        />
      ) : null;
    case 'equation':
      return (
      <div className={classes.formulaContainer}>
        <BlockMath key={id} math={value.expression} />
      </div>
      );
    default:
      return <div key={id}>Unsupported block type: {type}</div>;
  }
};

const renderTextItem = (textItem: TextItem, index: number): JSX.Element | null => {
  switch (textItem.type) {
    case 'text':
      return <span key={index}>{textItem.text?.content}</span>;
    case 'equation':
      return <InlineMath key={index} math={textItem.equation?.expression || ''} />;
    default:
      return <span key={index} />;
  }
};
