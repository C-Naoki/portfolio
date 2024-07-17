const TransLink = ({ url, children }: { url: string, children?: React.ReactNode }): JSX.Element => {
  return (
    <a className='link' href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default TransLink
