import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import Publication from '@/components/Publications'
import HorizontalLine from '@/components/Uikit/HorizontalLine'

export default function Publications (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('publications.heading')}>
      <Section id='conference' title={t('publications.conference')}>
        <HorizontalLine />
        <Publication name='KDD2025' />
        <HorizontalLine main={false} />
        <Publication name='KDDPC2024'/>
        <HorizontalLine main={false} />
        <Publication name='DEIM2024'/>
        <HorizontalLine main={false} />
        <Publication name='DAS2024'/>
        <HorizontalLine main={false} />
        <Publication name='DEIM2023'/>
      </Section>
      <Section id='journal' title={t('publications.journal')}>
        <HorizontalLine />
        <Publication name='TOD101'/>
        <HorizontalLine main={false} />
        <Publication name='AstronComput45'/>
      </Section>
      <Section id='patent' title={t('publications.patent')}>
        <HorizontalLine />
        <ul style={{ marginBottom: '0px' }}>
          <li>
            発明等：検出装置、検出⽅法及びプログラム<br />
            発明者：藤原 靖宏, 鬼塚 真, <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span><br />
            出願番号：特願2023-099796<br />
            出願日：2023.06.19
          </li>
        </ul>
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
