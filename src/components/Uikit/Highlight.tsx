import React from 'react'

interface HighlightProps {
  text: string
  query: string
}

const Highlight: React.FC<HighlightProps> = ({ text, query }) => {
  if (query === undefined || query === '') return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} style={{ background: 'yellow', color: 'inherit', padding: 0 }}>{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

export default Highlight
