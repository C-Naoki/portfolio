import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import Publication from '@/components/Publications'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import styles from '@/styles/globals.module.css'

export default function Publications (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('publications.heading')}>
      <div className={styles.section}>
        <h2>{t('publications.conference')}</h2>
        <HorizontalLine />
        <ul>
          <li><Publication name='DEIM2024'/></li>
          <li><Publication name='DEIM2023'/></li>
        </ul>
        <h2>{t('publications.journal')}</h2>
        <HorizontalLine />
        <ul>
          <li><Publication name='AstronComput45'/></li>
        </ul>
        <h2>{t('publications.patent')}</h2>
        <HorizontalLine />
        <ul>
          <li>
            発明等：検出装置、検出⽅法及びプログラム<br />
            発明者：藤原 靖宏, 鬼塚 真, <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>千原 直己</span><br />
            出願番号：特願2023-099796<br />
            出願日：2023.06.19<br />
          </li>
        </ul>
      </div>
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
