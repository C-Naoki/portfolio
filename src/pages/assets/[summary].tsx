import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetStaticPaths } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import Publication from '@/components/Publications'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

interface Asset {
  name: string
  url: string
}

export default function SummaryPage (): JSX.Element {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [assets, setAssets] = useState<Asset[]>([])
  const [error, setError] = useState<string | null>(null)

  const { summary } = router.query
  useEffect(() => {
    if (typeof summary !== 'string') return

    fetch(`/api/assets/${summary}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch assets')
        }
        return await response.json()
      })
      .then((data: Asset[]) => { setAssets(data) })
      .catch((err: Error) => { setError(err.message) })
  }, [summary])

  if (typeof summary !== 'string') {
    return <p>Loading...</p>
  }

  if (error != null) {
    return <p>Error: {error}</p>
  }

  const keys = fetchTranslationKeys(i18n, 'publications')
  let tag = ''
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading' || key === 'summary') {
      continue
    } else {
      const tempKeys = fetchTranslationKeys(i18n, `publications.${key}`)
      tempKeys.splice(tempKeys.indexOf('heading'), 1)
      if (tempKeys.includes(summary)) {
        tag = key
      }
    }
  }

  return (
    <Layout title={`${summary}`}>
      <Section id='details' title={t('publications.summary.details')}>
        <HorizontalLine />
          <div className='custom-list'>
            <Publication name={summary} tag={tag}/>
          </div>
      </Section>
      <Section id='resources' title={t('publications.summary.resources')}>
        <HorizontalLine />
        <div className='custom-list'>
          <ul>
            {assets.map((asset) => (
              <li key={asset.name} style={{ marginBottom: '10px' }}>
                <ExternalLink url={asset.url} text={asset.name} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps ({ locale }: { locale: string }): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 60
  }
}
