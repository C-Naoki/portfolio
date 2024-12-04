import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Affiliation from '@/components/Home/Affiliation'
import ProfileImage from '@/components/Home/Biography/ProfileImage'
import ProfileText from '@/components/Home/Biography/ProfileText'
import Education from '@/components/Home/Education'
import Experiences from '@/components/Home/Experiences'
import News from '@/components/Home/News'
import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import ExternalLink from '@/components/Uikit/ExternalLink'
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
        <Affiliation t={t}/>
      </Section>
      <Section id='news' title={t('news.heading')}>
        <HorizontalLine />
        <News t={t} i18n={i18n}/>
      </Section>
      <Section id='grants' title={t('grants.heading')}>
        <HorizontalLine />
        <div className="custom-list">
          <ul>
            <li data-marker={t('grants.yamashita-date')}>
              <ExternalLink url="https://www.ipsj.or.jp/award/yamashita2024.html" text={t('grants.yamashita')}/>
            </li>
            <li data-marker={t('grants.deim2024-date')}>
              <ExternalLink url="https://confit.atlas.jp/guide/event/deim2024/static/awards" text={t('grants.deim2024')}/>
            </li>
            <li data-marker={t('grants.hwip-date')}>
              <ExternalLink url="https://www.humanware.osaka-u.ac.jp/" text={t('grants.hwip')}/>
              <ul>
                <li>{t('grants.hwip-content1')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </Section>
      <Section id='experiences' title={t('experiences.heading')}>
        <Experiences t={t} i18n={i18n}/>
      </Section>
      <Section id='education' title={t('education.heading')}>
        <Education t={t} i18n={i18n}/>
      </Section>
      <Section id='misc' title={t('misc.heading')}>
        <HorizontalLine />
        <div className="custom-list">
          <ul>
            <li data-marker={t('misc.pigicon2023-date')}>
              <span>{t('misc.pigicon2023')}</span>
            </li>
            <li data-marker={t('misc.pakdd2023-date')}>
              <span>{t('misc.pakdd2023')}</span>
            </li>
            <li data-marker={t('misc.pandacco-date')}>
              <span>{t('misc.pandacco')} </span>
              <ExternalLink url='https://pandacco.web.app/' bracket={true}/>
            </li>
          </ul>
        </div>
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
