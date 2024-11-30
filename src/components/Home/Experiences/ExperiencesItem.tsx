import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

import type { TFunction } from 'next-i18next'

const ExperiencesItem = ({ type, t }: { type: string, t: TFunction }): JSX.Element => {
  return (
    <div className='experiences-item'>
      <h3 className='experiences-heading'>{t(`experiences.${type}`)}</h3>
      <div className='experiences-component'>
        <CalendarMonthOutlinedIcon className='experiences-icon'/>
        <span>{t(`experiences.${type}-date`)}</span>
      </div>
      <div className='experiences-component'>
        <WorkOutlineIcon className='experiences-icon'/>
        <span>{t(`experiences.${type}-role`)}</span>
      </div>
      {`experiences.${type}-content1` !== t(`experiences.${type}-content1`) && (
        <div className='experiences-component'>
          <span>{t(`experiences.${type}-content1`)}</span>
        </div>
      )}
    </div>
  )
}

export default ExperiencesItem
