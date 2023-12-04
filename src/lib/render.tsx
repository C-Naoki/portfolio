import { BlockMath, InlineMath } from 'react-katex';
import { Block, RichText } from '../types/notion.d';
import styles from '../styles/post.module.css';

export const Text = ({ rich_text }: { rich_text: RichText }) => {
  if (!rich_text) {
    return null;
  }
  const {
    annotations: { bold, code, color, italic, strikethrough, underline },
    text,
  } = rich_text;
  return (
    <span
      className={[
        bold ? styles.bold : "",
        code ? styles.code : "",
        italic ? styles.italic : "",
        strikethrough ? styles.strikethrough : "",
        underline ? styles.underline : "",
      ].join(" ")}
      style={color !== 'default' ? { color } : {}}
    >
      {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
    </span>
  );
};

export const RenderRichText = ({ rich_texts }: { rich_texts: RichText[] }) => {
  if (!rich_texts) {
    return null;
  }
  return rich_texts.map((rich_text: RichText) => {
    switch (rich_text.type) {
      case 'text':
        return <Text rich_text={rich_text} />;
      case 'equation':
        return <InlineMath math={rich_text.equation?.expression || ''} />;
      default:
        return <span />;
    };
  });
};

export const renderBlock = (block: Block): JSX.Element | null => {
  const { type, id } = block;
  const value = block[type];
  console.log(block);

  switch (type) {
    case 'paragraph':
      return (
        <p key={id} style={{marginTop: '5px', marginBlock: '5px'}}>
          <RenderRichText rich_texts={value.rich_text} />
        </p>
      );
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      const Tag = type === 'heading_1' ? 'h1' : type === 'heading_2' ? 'h2' : 'h3';
      return (
        <Tag key={id}>
          <RenderRichText rich_texts={value.rich_text} />
        </Tag>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <RenderRichText rich_texts={value.rich_text} />
          {!!value.children && value.children.length > 0 && renderNestedList(block)}
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
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <BlockMath key={id} math={value.expression} />
      </div>
      );
    default:
      return <div key={id}>Unsupported block type: {type}</div>;
  }
};

const renderNestedList = (block: Block) => {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return (
      <ol>
        {value.children.map((block: Block) => renderBlock(block))}
      </ol>
    )
  }
  return (
    <ul>
      {value.children.map((block: Block) => renderBlock(block))}
    </ul>
  )
}