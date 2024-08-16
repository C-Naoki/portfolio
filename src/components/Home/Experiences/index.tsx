import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

import type { TFunction } from 'next-i18next'
const Experiences = ({ type, t }: { type: string, t: TFunction }): JSX.Element => {
  return (
    <div className='experience'>
      <h3 className='experience-heading'>{t(`experiences.${type}`)}</h3>
      <div className='experience-component'>
        <CalendarMonthOutlinedIcon className='experience-icon' />
        <span>{t(`experiences.${type}-date`)}</span>
      </div>
      <div className='experience-component'>
        <WorkOutlineIcon className='experience-icon' />
        <span>{t(`experiences.${type}-role`)}</span>
      </div>
      {`experiences.${type}-content1` !== t(`experiences.${type}-content1`) && (
        <div className='experience-component'>
          <span>{t(`experiences.${type}-content1`)}</span>
        </div>
      )}
    </div>
  )
}

export default Experiences
