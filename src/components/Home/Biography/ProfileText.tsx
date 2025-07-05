import { useRouter } from 'next/router'
import { Trans } from 'next-i18next'
import { FaDownload } from 'react-icons/fa'

import TransLink from '@/components/Uikit/TransLink'
import externalLinksInfo from '@/constants/externalLinksInfo'

const ProfileText = (): JSX.Element => {
  const { locale } = useRouter()
  const components: Record<string, JSX.Element> = {}

  for (const [key, url] of Object.entries(externalLinksInfo.biography)) {
    components[key] = <TransLink url={url as string} />
  }

  const cvUrl =
    locale === 'ja'
      ? externalLinksInfo.cv.replace('cv.pdf', 'cv_ja.pdf')
      : externalLinksInfo.cv

  return (
    <div className="profile-text">
      <Trans
        i18nKey="profile-text"
        components={components}
      />
      <div style={{ marginTop: '15px' }}>
        <FaDownload className="fa-download"/>
        <Trans i18nKey="cv" components={{ link_cv: <TransLink url={cvUrl} /> }} />
      </div>
    </div>
  )
}

export default ProfileText
