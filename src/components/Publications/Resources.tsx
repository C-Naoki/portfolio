import type { ResourcesProps } from '@/constants/publicationsInfo'

import ExternalLink from '@/components/Uikit/ExternalLink'

const Resources = (resources: ResourcesProps): JSX.Element => {
  const referenceEntries = Object.entries(resources).map(([key, value]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    url: value
  }))

  return (
    <div>
      {referenceEntries.map(({ key, label, url }) => (
        <ExternalLink key={key} url={url} text={label} />
      ))}
    </div>
  )
}

export default Resources
