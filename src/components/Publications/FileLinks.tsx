import React from 'react'

import useFiles from '@/lib/hooks/useFiles'
import styles from '@/styles/globals.module.css'

interface FileLinksProps {
  name: string
}

export const FileLinks: React.FC<FileLinksProps> = ({ name }) => {
  const files = useFiles(name)

  return (
    <div>
      {files.map((file, index) => (
        <React.Fragment key={file}>
          <a className={styles.link} key={file} href={`/assets/${name}/${file}`} target="_blank" rel="noopener noreferrer">
              [{file.replace('.pdf', '')}]
          </a>
          {index < files.length - 1 && ' '}
        </React.Fragment>
      ))}
    </div>
  )
}

export default FileLinks
