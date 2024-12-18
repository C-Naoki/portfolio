import type { ResourcesProps } from '@/constants/externalLinksInfo'

import ExternalLink from '@/components/Uikit/ExternalLink'

const Resources = ({ resources }: { resources: ResourcesProps }): JSX.Element => {
  return (
    <div>
      {Object.entries(resources).map(([name, url], index) => (
        <span key={name}>
          [<ExternalLink url={url} text={name}/>]
          {index < Object.entries(resources).length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  )
}

export default Resources
