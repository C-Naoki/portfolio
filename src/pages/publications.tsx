import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import Publication from '@/components/Publications'
import Patent from '@/components/Publications/Patent'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

export default function Publications (): JSX.Element {
  const { t, i18n } = useTranslation()
  const keys = fetchTranslationKeys(i18n, 'publications')
  const publicationsKeys: Record<string, string[]> = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading') {
      continue
    } else {
      const tempKeys = fetchTranslationKeys(i18n, `publications.${key}`)
      tempKeys.splice(tempKeys.indexOf('heading'), 1)
      publicationsKeys[key] = tempKeys
    }
  }

  return (
    <Layout title={t('publications.heading')}>
      {Object.keys(publicationsKeys).map((key, index) => (
        <Section key={index} id={key} title={t(`publications.${key}.heading`)}>
          <HorizontalLine />
          <div className='custom-list'>
            <ol>
              {publicationsKeys[key].map((publicationKey, index) => (
                key !== 'patent'
                  ? (
                  <li key={index}><Publication name={publicationKey} tag={key}/></li>
                    )
                  : (
                  <li key={index}><Patent name={publicationKey}/></li>
                    )
              ))}
            </ol>
        </div>
        </Section>
      ))}
    </Layout>
  )
}

export async function getStaticProps ({ locale }: { locale: string }): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
    revalidate: 60
  }
}
