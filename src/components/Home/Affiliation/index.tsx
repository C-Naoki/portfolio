import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

import type { i18n } from 'i18next'
import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'
import ExternalLinksInfo from '@/constants/externalLinksInfo'
import fetchTranslationKeys from '@/lib/utils/fetchTranslationKeys'

const Affiliation = ({ t, i18n }: { t: TFunction, i18n: i18n }): JSX.Element => {
  const keys = fetchTranslationKeys(i18n, 'affiliation')
  const links = ExternalLinksInfo.affiliation
  const affiliationKeys: Array<{ body: string }> = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === 'heading' || key === 'address' || key === 'email') {
      continue
    } else if (!key.includes('-')) {
      if (keys.includes(key)) {
        affiliationKeys.push({ body: key })
      }
    }
  }

  return (
    <div>
      <div className='institution'>
        {affiliationKeys.map(({ body }, index) => (
          <span key={index}>
            <ExternalLink url={links[body]} text={t(`affiliation.${body}`)} />
            {index !== affiliationKeys.length - 1 && <br />}
          </span>
        ))}
      </div>
      <div className='contact-info'>
        {t('affiliation.address') !== 'affiliation.address' && (
          <div className="contact-item">
            <FaMapMarkerAlt className="fa-map"/>
            <span>{t('affiliation.address')}</span>
          </div>
        )}
        <div className="contact-item">
          <FaEnvelope className="fa-envelope"/>
          <span>{t('affiliation.email')}</span>
        </div>
      </div>
    </div>
  )
}

export default Affiliation
