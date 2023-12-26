import Image from 'next/image';
import { Fragment, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { BlockMath, InlineMath } from 'react-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from '../styles/post.module.css';
import { Block, Code, RichText } from '../types/notion.d';

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

export const CodeBlock = ({ code }: { code: Code }) => {
  const language = code.language || 'plaintext';
  const codeString = code.rich_text.map((textItem) => textItem.plain_text).join('');
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.codeBlockHeader}>
        <div className={styles.languageLabel}>
          {language.toUpperCase()}
        </div>
        {isCopied && (
            <div className={styles.copiedMessage}>
              コピーしました！
            </div>
          )}
          <CopyToClipboard text={codeString} onCopy={handleCopy}>
            <button className={styles.copyButton}>
              <span role="img" aria-label="Copy">
                <FiCopy />
              </span>
            </button>
          </CopyToClipboard>
      </div>
      <div className={styles.codeBlock}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={true}
          showInlineLineNumbers={false}
          lineNumberStyle={{
            paddingRight: '25px',
            paddingLeft: '0px',
            textAlign: 'left',
            userSelect: 'none',
            color: 'gray',
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </>
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
        <li key={id} style={{marginTop: '5px', marginBottom: '5px'}}>
          <RenderRichText rich_texts={value.rich_text} />
          {!!value.children && value.children.length > 0 && renderNestedList(block)}
        </li>
      );
    case 'image':
      const imageStyle = {
        maxWidth: '80%',
        height: 'auto',
        display: 'block',
        margin: '0 auto',
      };
      const imageUrl = value.file?.url || value.external?.url;
      return imageUrl ? (
        <Image
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
    case 'toggle':
      return (
        <details>
          <summary>
            <RenderRichText rich_texts={value.rich_text} />
          </summary>
          {block.toggle.children?.map((child: Block) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'code':
      return (
        <pre>
          <code className={styles.code_block} key={id}>
            <CodeBlock code={value} />
          </code>
        </pre>
      );
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
    <ul style={{marginTop: '5px', marginBottom: '5px'}}>
      {value.children.map((block: Block) => renderBlock(block))}
    </ul>
  )
}
