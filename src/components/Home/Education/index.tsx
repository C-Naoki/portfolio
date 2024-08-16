import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

import type { TFunction } from 'next-i18next'

const Education = ({ type, t }: { type: string, t: TFunction }): JSX.Element => {
  return (
    <div className='education'>
      <h3 className='education-heading'>{t(`education.${type}`)}</h3>
      <div className='education-component'>
        <CalendarMonthOutlinedIcon className='education-icon' />
        <span>{t(`education.${type}-date`)}</span>
      </div>
      <div className='education-component'>
        <SchoolOutlinedIcon className='education-icon' />
        <span>{t(`education.${type}-affiliation`)}</span>
      </div>
      {`education.${type}-supervisor` !== t(`education.${type}-supervisor`) && (
        <div className='education-component'>
          <Person2OutlinedIcon className='education-icon' />
          <span>{t(`education.${type}-supervisor`)}</span>
        </div>
      )}
    </div>
  )
}

export default Education
