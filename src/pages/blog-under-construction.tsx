import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/Layouts/Layout'

export default function BlogUnderConstruction (): JSX.Element {
  const { t } = useTranslation()
  return (
    <Layout title={t('blog.heading')}>
      <p>{t('blog.preparation')}</p>
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
