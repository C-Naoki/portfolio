import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

import Layout from '@/components/Layouts/Layout'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import Link from '@/components/Uikit/Link'
import TransLink from '@/components/Uikit/TransLink'
import styles from '@/styles/globals.module.css'

export default function Home (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('title')}>
      <div className={styles.section}>
        <p>
          <Trans
            i18nKey="welcome"
            components={{
              link_makoto: <TransLink url="http://www-bigdata.ist.osaka-u.ac.jp/professor/onizuka/onizuka_en.html" />,
              link_yasushi: <TransLink url="https://www.dm.sanken.osaka-u.ac.jp/~yasushi/index-j.htm" />,
              link_yasuko: <TransLink url="https://www.dm.sanken.osaka-u.ac.jp/~yasuko/index.html" />,
              link_hwip: <TransLink url="https://www.humanware.osaka-u.ac.jp/en/" />
            }}
          />
        </p>
        <p>
          <FaDownload className="fa-icon" />
          <Trans i18nKey="cv" components={{ link_cv: <TransLink url="assets/CV.pdf" /> }} />
        </p>
        <h2>{t('affiliation.heading')}</h2>
        <HorizontalLine />
        <div>
          <ExternalLink url="https://www.dm.sanken.osaka-u.ac.jp/" text={t('affiliation.laboratory')} /><br />
          <ExternalLink url="https://www.sanken.osaka-u.ac.jp/en/" text={t('affiliation.SANKEN')} /><br />
          <ExternalLink url="https://www.ist.osaka-u.ac.jp/english/" text={t('affiliation.graduate')} /><br />
          <ExternalLink url="https://www.osaka-u.ac.jp/en" text={t('affiliation.university')} /><br />
        </div>
        <p>
          <FaMapMarkerAlt className="fa-icon" />{t('affiliation.address')}<br />
          <FaEnvelope className="fa-icon" />naoki88[at]sanken.osaka-u.ac.jp
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
            <span>{t('experiences.SANKEN')}</span>
          </li>
          <li data-marker={t('experiences.TA-date')}>
            <span>{t('experiences.TA')}</span>
            <ul className="custom-nested-list">
              <li>{t('experiences.TA-content1')}</li>
            </ul>
          </li>
          <li data-marker={t('experiences.IST-date')}>
            <span>{t('experiences.IST')}</span>
            <ul className="custom-nested-list">
              <li>{t('experiences.IST-content1')}</li>
            </ul>
          </li>
          <li data-marker={t('experiences.nagase-date')}>
            <span>{t('experiences.nagase')}</span>
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
        <div>
          <ul className="custom-list">
            <li data-marker={t('misc.pigicon2023-date')}>
              <span>{t('misc.pigicon2023')}</span>
            </li>
            <li data-marker={t('misc.pakdd2023-date')}>
              <span>{t('misc.pakdd2023')}</span>
            </li>
            <li data-marker={t('misc.pandacco-date')}>
              <span>{t('misc.pandacco')}</span>
              <Link url='https://pandacco.web.app/' />
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
