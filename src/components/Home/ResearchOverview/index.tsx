import { useTranslation } from 'next-i18next'

const researchTopics = [
  'causal-mechanism',
  'streaming-algorithm',
  'causal-decision-making'
] as const

const ResearchOverview = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const keywordsValue = t('home.research-overview.keywords.items', { returnObjects: true })
  const keywords = Array.isArray(keywordsValue) ? keywordsValue : []

  return (
    <div className="custom-list research-overview" lang={i18n.resolvedLanguage ?? i18n.language}>
      <p className="research-overview-lead">
        {t('home.research-overview.lead')}
      </p>
      <ul>
        {researchTopics.map((topic) => (
          <li className="research-overview-topic" key={topic}>
            <span className="research-overview-topic-title">
              {t(`home.research-overview.topics.${topic}.title`)}
            </span>
            <span>{t(`home.research-overview.topics.${topic}.description`)}</span>
          </li>
        ))}
      </ul>
      <p className="research-overview-keywords">
        <span className="research-overview-keywords-label">
          {t('home.research-overview.keywords.heading')}
        </span>
        <span>
          {keywords.map((keyword, index) => (
            <span className="research-overview-keyword" key={`${keyword}-${index}`}>
              {keyword}
              {index < keywords.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </span>
      </p>
    </div>
  )
}

export default ResearchOverview
