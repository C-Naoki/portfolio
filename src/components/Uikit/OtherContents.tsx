import MenuBookIcon from '@mui/icons-material/MenuBook'

const OtherContents = ({ className, type, t }: { className: string, type: string, t: Record<string, string> }): JSX.Element => {
  const lessonKeywords = ['科目', 'lesson']

  const texts = []
  const icons: Array<JSX.Element | null> = []
  let index = 1

  while (true) {
    const key = `content${index}`
    const content = t[`${type}-${key}`]

    if (content === undefined) break

    if (lessonKeywords.some(lessonKeywords => t[`${type}-${key}`].toLowerCase().includes(lessonKeywords.toLowerCase()))) {
      icons.push(<MenuBookIcon className='icon'/>)
    } else {
      icons.push(null)
    }
    texts.push(<span key={key}>{content}</span>)
    index++
  }

  return (
    <div>
      {texts.map((text, idx) => (
        <div key={idx} className={className}>
          {icons[idx]}
          {text}
        </div>
      ))}
    </div>
  )
}

export default OtherContents
