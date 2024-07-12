import styles from '@/styles/globals.module.css'

const TransLink = ({ url, children }: { url: string, children?: React.ReactNode }): JSX.Element => {
  return (
    <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default TransLink
