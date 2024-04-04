import type { ResourcesProps } from '@/constants/publicationsInfo'

import ExternalLink from '@/components/Uikit/ExternalLink'

const Resources = (resources: ResourcesProps): JSX.Element => {
  const referenceEntries = Object.entries(resources).map(([key, value]) => ({
    key,
    label: `[${key}]`,
    url: value
  }))

  return (
    <div>
    {referenceEntries.map(({ key, label, url }, index) => (
      <span key={key}>
        <ExternalLink url={url} text={label} />
        {index < referenceEntries.length - 1 ? ' ' : ''}
      </span>
    ))}
    </div>
  )
}

export default Resources
