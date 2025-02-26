import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function NotFoundPage (): JSX.Element {
  const router = useRouter()
  const currentUrl = router.asPath

  return (
    <Layout title='Error 404'>
      <Section id='404' title='Page Not Found 😕'>
        <HorizontalLine />
        Sorry, the URL you requested <code>{currentUrl}</code> was not found on this server. <br />
        Please check the URL and try again. <br />
        You can return to the <ExternalLink text='homepage' url='/'/> if needed.
      </Section>
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
