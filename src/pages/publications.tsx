import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import Publication from '@/components/Publications'
import Patent from '@/components/Publications/Patent'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function Publications (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('publications.heading')}>
      <Section id='international-conference' title={t('publications.international-conference.heading')}>
        <HorizontalLine />
        <div className='custom-list'>
          <ol>
            <li><Publication name='KDD2025' tag='international-conference'/></li>
            <li><Publication name='KDDPC2024' tag='international-conference'/></li>
          </ol>
        </div>
      </Section>
      <Section id='journal' title={t('publications.journal.heading')}>
        <HorizontalLine />
        <div className='custom-list'>
          <ol>
            <li><Publication name='TOD101' tag='journal'/></li>
            <li><Publication name='AstronComput45' tag='journal'/></li>
          </ol>
        </div>
      </Section>
      <Section id='domestic' title={t('publications.domestic.heading')}>
        <HorizontalLine />
        <div className='custom-list'>
          <ol>
            <li><Publication name='DEIM2024' tag='domestic'/></li>
            <li><Publication name='DAS2024' tag='domestic'/></li>
            <li><Publication name='DEIM2023' tag='domestic' /></li>
          </ol>
        </div>
      </Section>
      <Section id='patent' title={t('publications.patent.heading')}>
        <HorizontalLine />
        <div className='custom-list'>
          <ol>
            <li><Patent name='kenshutsu2023'/></li>
          </ol>
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
