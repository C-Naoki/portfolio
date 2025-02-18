import React, { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import externalLinksInfo from '@/constants/externalLinksInfo'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const yourName = t('name', { lng: 'en' })
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    const fetchLastCommitDate = async (): Promise<void> => {
      const response = await fetch(externalLinksInfo.commit_api)
      const commits = await response.json()
      if (commits.length > 0) {
        const lastCommitDate = new Date(commits[0].commit.committer.date as string)
        const formattedDate = lastCommitDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
        setLastUpdated(formattedDate)
      }
    }
    void fetchLastCommitDate()
  }, [])

  return (
    <footer style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <p>Copyright © 2023 {yourName}. All rights reserved. <br />Last updated on {lastUpdated}</p>
    </footer>
  )
}

export default Footer
