import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

import type { TFunction } from 'next-i18next'

import OtherContents from '@/components/Uikit/OtherContents'

const ExperiencesItem = ({ type, t }: { type: string, t: TFunction }): JSX.Element => {
  const otherContentsRecord = t('experiences', { returnObjects: true }) as Record<string, string>
  return (
    <div className='experiences-item'>
      <h3 className='heading'>{t(`experiences.${type}`)}</h3>
      <div className='component'>
        <CalendarMonthOutlinedIcon className='icon'/>
        <span>{t(`experiences.${type}-date`)}</span>
      </div>
      <div className='component'>
        <WorkOutlineIcon className='icon'/>
        <span>{t(`experiences.${type}-role`)}</span>
      </div>
      <OtherContents className='component' type={type} t={otherContentsRecord}/>
    </div>
  )
}

export default ExperiencesItem
