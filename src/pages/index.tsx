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
        <ul className="custom-list">
          <li data-marker={t('grants.deim2024-date')}>
            <ExternalLink url="https://confit.atlas.jp/guide/event/deim2024/static/awards" text={t('grants.deim2024')} />
          </li>
          <li data-marker={t('grants.hwip-date')}>
            <ExternalLink url="https://www.humanware.osaka-u.ac.jp/" text={t('grants.hwip-scholarship')} />
          </li>
        </ul>
        <h2>{t('experiences.heading')}</h2>
        <HorizontalLine />
        <ul className="custom-list">
          <li data-marker={t('experiences.SANKEN-date')}>
            <a>{t('experiences.SANKEN')}</a>
          </li>
          <li data-marker={t('experiences.TA-date')}>
            <a>{t('experiences.TA')}</a>
            <ul className="custom-nested-list">
              <li>{t('experiences.TA-content1')}</li>
            </ul>
          </li>
          <li data-marker={t('experiences.IST-date')}>
            <a>{t('experiences.IST')}</a>
            <ul className="custom-nested-list">
              <li>{t('experiences.IST-content1')}</li>
            </ul>
          </li>
          <li data-marker={t('experiences.nagase-date')}>
            <a>{t('experiences.nagase')}</a>
          </li>
        </ul>
        <h2>{t('education.heading')}</h2>
        <HorizontalLine />
        <ul className="custom-list">
          <li data-marker={t('education.Master-date')}>
            <a className="pre-wrap">{t('education.Master')}</a>
            <ul className="custom-nested-list">
              <li>{t('education.Master-affiliation')}</li>
              <li>{t('education.Master-supervisor')}</li>
            </ul>
          </li>
          <li data-marker={t('education.Bachelor-date')}>
            <a className="pre-wrap">{t('education.Bachelor')}</a>
            <ul className="custom-nested-list">
              <li>{t('education.Bachelor-affiliation')}</li>
              <li>{t('education.Bachelor-supervisor')}</li>
            </ul>
          </li>
          <li data-marker={t('education.secondary-date')}>
            <a className="pre-wrap">{t('education.secondary')}</a>
            <ul className="custom-nested-list">
              <li>{t('education.secondary-affiliation')}</li>
            </ul>
          </li>
        </ul>
        <h2>{t('misc.heading')}</h2>
        <HorizontalLine />
        <div className={styles.links}>
          <ul className="custom-list">
            <li data-marker={t('misc.pakdd2023-date')}>
              <a>{t('misc.pakdd2023')}</a>
            </li>
            <li data-marker={t('misc.pandacco-date')}>
              <ExternalLink url="https://pandacco.web.app/" text={t('misc.pandacco')} />
              <ul className="custom-nested-list">
                <li>Google Developer Student Clubs (GDSC)</li>
              </ul>
            </li>
          </ul>
        </div>
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
