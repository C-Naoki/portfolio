import { useState } from 'react'

import type { ResourcesProps } from '@/constants/externalLinksInfo'

import ExternalLink from '@/components/Uikit/ExternalLink'

const Resources = ({ resources, abstract }: { resources: ResourcesProps, abstract: string }): JSX.Element => {
  const [showAbstract, setShowAbstract] = useState(false)

  return (
    <div>
      {Object.entries(resources).map(([name, url]) => (
        <span key={name}>
          [<ExternalLink url={url} text={name} />]{' '}
        </span>
      ))}
      {abstract !== '' && (
        <span>
          <span onClick={() => { setShowAbstract(!showAbstract) }}>
            [<span className="link">abstract</span>]
          </span>
          {showAbstract && (
            <div className="abstract-box">
              <div className='abstract-title'>Abstract</div>
              <p>{abstract}</p>
            </div>
          )}
        </span>
      )}
    </div>
  )
}

export default Resources
