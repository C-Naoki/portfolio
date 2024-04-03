import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/Layouts/Layout'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import styles from '@/styles/globals.module.css'

export default function Home (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('title')}>
      <div className={styles.section}>
        <p dangerouslySetInnerHTML={{ __html: t('welcome').replace(/\n/g, '<br>') }} />
        <h2>{t('affiliation.heading')}</h2>
        <HorizontalLine />
        <div className={styles.links}>
          <ExternalLink url="https://www.osaka-u.ac.jp/en" text={t('affiliation.laboratory')} /><br />
          <ExternalLink url="https://www.sanken.osaka-u.ac.jp/en/" text={t('affiliation.SANKEN')} /><br />
          <ExternalLink url="https://www.ist.osaka-u.ac.jp/english/" text={t('affiliation.graduate')} /><br />
          <ExternalLink url="https://www.osaka-u.ac.jp/en" text={t('affiliation.university')} /><br />
        </div>
        <p>
          {t('affiliation.address')}<br />
          Email: naoki88[at]sanken.osaka-u.ac.jp
        </p>
        <h2>{t('grants.heading')}</h2>
        <HorizontalLine />
        <ul>
          <li>{t('grants.hwip year')}: {t('grants.hwip name')}</li>
        </ul>
        <h2>{t('experiences.heading')}</h2>
        <HorizontalLine />
        <ul>
          <li>{t('experiences.sanken year')}: {t('experiences.sanken name')}</li>
          <li>{t('experiences.TA year')}: {t('experiences.TA name')}</li>
          <li>{t('experiences.nagase year')}: {t('experiences.nagase name')}</li>
        </ul>
        <h2>{t('education.heading')}</h2>
        <HorizontalLine />
        <ul>
          <li><div className="pre-wrap">{t('education.M.Sc.')}</div></li>
          <li><div className="pre-wrap">{t('education.B.Sc.')}</div></li>
          <li><div className="pre-wrap">{t('education.secondary')}</div></li>
        </ul>
        <h2>{t('misc.heading')}</h2>
        <HorizontalLine />
        <ul>
          <li>
            <div className={styles.links}>
              <a href="https://pandacco.web.app/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                {t('misc.pandacco')}
              </a> <i>-- developer</i><br />
              Google Developer Student Clubs (GDSC) <br />
            </div>
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
