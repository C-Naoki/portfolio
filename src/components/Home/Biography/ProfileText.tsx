import { Trans } from 'next-i18next'
import { FaDownload } from 'react-icons/fa'

import TransLink from '@/components/Uikit/TransLink'
import externalLinksInfo from '@/constants/externalLinksInfo'

const ProfileText = (): JSX.Element => {
  const components: Record<string, JSX.Element> = {}

  for (const [key, url] of Object.entries(externalLinksInfo.biography)) {
    components[key] = <TransLink url={url as string} />
  }

  return (
    <div className='profile-text'>
      <Trans
        i18nKey="profile-text"
        components={components}
      />
      <div style={{ marginTop: '15px' }}>
        <FaDownload className="fa-download"/>
        <Trans i18nKey="cv" components={{ link_cv: <TransLink url={externalLinksInfo.cv}/> }}/>
      </div>
    </div>
  )
}

export default ProfileText
