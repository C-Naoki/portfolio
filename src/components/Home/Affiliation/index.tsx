import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

import type { TFunction } from 'next-i18next'

import ExternalLink from '@/components/Uikit/ExternalLink'

const Affiliation = ({ t }: { t: TFunction }): JSX.Element => {
  return (
    <div>
      <div className='institution'>
        <ExternalLink url="https://www.dm.sanken.osaka-u.ac.jp/" text={t('affiliation.laboratory')}/>
        <ExternalLink url="https://www.sanken.osaka-u.ac.jp/en/" text={t('affiliation.SANKEN')}/>
        <ExternalLink url="https://www.ist.osaka-u.ac.jp/english/" text={t('affiliation.graduate')}/>
        <ExternalLink url="https://www.osaka-u.ac.jp/en" text={t('affiliation.university')}/>
      </div>
      <div className='contact-info'>
        <div className="contact-item">
          <FaMapMarkerAlt className="fa-map"/>
          <span>{t('affiliation.address')}</span>
        </div>
        <div className="contact-item">
          <FaEnvelope className="fa-envelope"/>
          <span>{t('affiliation.email')}</span>
        </div>
      </div>
    </div>
  )
}

export default Affiliation
