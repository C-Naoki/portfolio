import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

import Education from '@/components/Home/Education'
import Experiences from '@/components/Home/Experiences'
import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import TransLink from '@/components/Uikit/TransLink'

export default function Home (): JSX.Element {
  const { t } = useTranslation()

  return (
    <Layout title={t('title')}>
      <Section id='biography' title={t('biography.heading')}>
        <HorizontalLine />
        <Trans
          i18nKey="welcome"
          components={{
            link_makoto: <TransLink url="http://www-bigdata.ist.osaka-u.ac.jp/professor/onizuka/onizuka_en.html"/>,
            link_yasushi: <TransLink url="https://www.dm.sanken.osaka-u.ac.jp/~yasushi/index-j.html"/>,
            link_yasuko: <TransLink url="https://www.dm.sanken.osaka-u.ac.jp/~yasuko/index.html"/>,
            link_hwip: <TransLink url="https://www.humanware.osaka-u.ac.jp/en/"/>
          }}
        />
        <div style={{ marginTop: '15px' }}>
          <FaDownload className="fa-icon"/>
          <Trans i18nKey="cv" components={{ link_cv: <TransLink url="assets/CV.pdf"/> }}/>
        </div>
      </Section>
      <Section id='affiliation' title={t('affiliation.heading')}>
        <HorizontalLine />
        <div>
          <ExternalLink url="https://www.dm.sanken.osaka-u.ac.jp/" text={t('affiliation.laboratory')}/><br />
          <ExternalLink url="https://www.sanken.osaka-u.ac.jp/en/" text={t('affiliation.SANKEN')}/><br />
          <ExternalLink url="https://www.ist.osaka-u.ac.jp/english/" text={t('affiliation.graduate')}/><br />
          <ExternalLink url="https://www.osaka-u.ac.jp/en" text={t('affiliation.university')}/><br />
        </div>
        <div style={{ marginTop: '15px' }}>
          <FaMapMarkerAlt className="fa-icon" />{t('affiliation.address')}<br />
          <FaEnvelope className="fa-icon" />naoki88[at]sanken.osaka-u.ac.jp
        </div>
      </Section>
      <Section id='news' title={t('news.heading')}>
        <HorizontalLine />
        <ul className="news">
          <li data-marker={t('news.dc1-date')}>
            <span>{t('news.dc1')}</span>
          </li>
          <li data-marker={t('news.yamashita-award-date')}>
            <span>{t('news.yamashita-award')}</span>
          </li>
          <li data-marker={t('news.kddpc2024-date')}>
            <span>{t('news.kddpc2024')}</span>
          </li>
          <li data-marker={t('news.deim2024-award-date')}>
            <span>{t('news.deim2024-award')}</span>
          </li>
          <li data-marker={t('news.tod101-date')}>
            <span>{t('news.tod101')}</span>
          </li>
          <li data-marker={t('news.AstronComput45-date')}>
            <span>{t('news.AstronComput45')}</span>
          </li>
          <li data-marker={t('news.bachelor-graduate-date')}>
            <span>{t('news.bachelor-graduate')}</span>
          </li>
          <li data-marker={t('news.hwip-passing-date')}>
            <span>{t('news.hwip-passing')}</span>
          </li>
        </ul>
      </Section>
      <Section id='grants' title={t('grants.heading')}>
        <HorizontalLine />
        <ul className="custom-list">
          <li data-marker={t('grants.yamashita-date')}>
            <ExternalLink url="https://www.ipsj.or.jp/award/yamashita2024.html" text={t('grants.yamashita')}/>
          </li>
          <li data-marker={t('grants.deim2024-date')}>
            <ExternalLink url="https://confit.atlas.jp/guide/event/deim2024/static/awards" text={t('grants.deim2024')}/>
          </li>
          <li data-marker={t('grants.hwip-date')}>
            <ExternalLink url="https://www.humanware.osaka-u.ac.jp/" text={t('grants.hwip')}/>
            <ul className="custom-nested-list">
              <li>{t('grants.hwip-content1')}</li>
            </ul>
          </li>
        </ul>
      </Section>
      <Section id='experiences' title={t('experiences.heading')}>
        <HorizontalLine />
        <Experiences type='SANKEN' t={t}/>
        <HorizontalLine main={false}/>
        <Experiences type='TA' t={t}/>
        <HorizontalLine main={false}/>
        <Experiences type='IST' t={t}/>
        <HorizontalLine main={false}/>
        <Experiences type='nagase' t={t}/>
      </Section>
      <Section id='education' title={t('education.heading')}>
        <HorizontalLine />
        <Education type='Master' t={t}/>
        <HorizontalLine main={false}/>
        <Education type='Bachelor' t={t}/>
        <HorizontalLine main={false}/>
        <Education type='secondary' t={t}/>
      </Section>
      <Section id='misc' title={t('misc.heading')}>
        <HorizontalLine />
        <ul className="custom-list">
          <li data-marker={t('misc.pigicon2023-date')}>
            <span>{t('misc.pigicon2023')}</span>
          </li>
          <li data-marker={t('misc.pakdd2023-date')}>
            <span>{t('misc.pakdd2023')}</span>
          </li>
          <li data-marker={t('misc.pandacco-date')}>
            <span>{t('misc.pandacco')} </span>
            <ExternalLink url='https://pandacco.web.app/' bracket={true}/>
            <ul className="custom-nested-list">
              <li>Google Developer Student Clubs (GDSC)</li>
            </ul>
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
