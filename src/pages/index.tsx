import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ProfileImage from '@/components/Home/Biography/ProfileImage'
import ProfileText from '@/components/Home/Biography/ProfileText'
import News from '@/components/Home/News'
import ResearchOverview from '@/components/Home/ResearchOverview'
import SelectedPublications from '@/components/Home/SelectedPublications'
import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function Home (): JSX.Element {
  const { t, i18n } = useTranslation()

  return (
    <Layout title={t('title')}>
      <Section id='biography' title={t('biography.heading')}>
        <HorizontalLine />
        <div className='biography'>
          <ProfileText />
          <ProfileImage />
        </div>
      </Section>
      <Section id='news' title={t('news.heading')}>
        <HorizontalLine />
        <News t={t} i18n={i18n}/>
      </Section>
      <Section id='research-overview' title={t('home.research-overview.heading')}>
        <HorizontalLine />
        <ResearchOverview />
      </Section>
      <Section id='selected-publications' title={t('home.selected-publications.heading')}>
        <HorizontalLine />
        <SelectedPublications />
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
