import React, { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import externalLinksInfo from '@/constants/externalLinksInfo'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const yourName = t('name', { lng: 'en' })
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    const fetchLastCommitDate = async (): Promise<void> => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return
      }

      try {
        const response = await fetch(externalLinksInfo.commit_api)
        if (!response.ok) {
          throw new Error('Failed to fetch last commit date')
        }
        const commits = await response.json()

        if (Array.isArray(commits) && commits.length > 0) {
          const lastCommitDate = new Date(commits[0]?.commit?.committer?.date as string)
          if (Number.isNaN(lastCommitDate.getTime())) {
            return
          }
          const formattedDate = lastCommitDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
          setLastUpdated(formattedDate)
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Unable to determine last updated date', error)
        }
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
