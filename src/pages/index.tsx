import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Affiliation from '@/components/Home/Affiliation'
import ProfileImage from '@/components/Home/Biography/ProfileImage'
import ProfileText from '@/components/Home/Biography/ProfileText'
import Education from '@/components/Home/Education'
import Experiences from '@/components/Home/Experiences'
import GrantsAwards from '@/components/Home/GrantsAwards'
import Misc from '@/components/Home/Misc'
import News from '@/components/Home/News'
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
      <Section id='affiliation' title={t('affiliation.heading')}>
        <HorizontalLine />
        <Affiliation t={t} i18n={i18n}/>
      </Section>
      <Section id='news' title={t('news.heading')}>
        <HorizontalLine />
        <News t={t} i18n={i18n}/>
      </Section>
      <Section id='grants-awards' title={t('grants-awards.heading')}>
        <HorizontalLine />
        <GrantsAwards t={t} i18n={i18n}/>
      </Section>
      <Section id='experiences' title={t('experiences.heading')}>
        <HorizontalLine />
        <Experiences t={t} i18n={i18n}/>
      </Section>
      <Section id='education' title={t('education.heading')}>
        <HorizontalLine />
        <Education t={t} i18n={i18n}/>
      </Section>
      <Section id='misc' title={t('misc.heading')}>
        <HorizontalLine />
        <Misc t={t} i18n={i18n}/>
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
