import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

import type { TFunction } from 'next-i18next'

const EducationItem = ({ type, t }: { type: string, t: TFunction }): JSX.Element => {
  return (
    <div className='education-item'>
      <h3 className='heading'>{t(`education.${type}`)}</h3>
      <div className='component'>
        <CalendarMonthOutlinedIcon className='icon'/>
        <span>{t(`education.${type}-date`)}</span>
      </div>
      <div className='component'>
        <SchoolOutlinedIcon className='icon'/>
        <span>{t(`education.${type}-affiliation`)}</span>
      </div>
      {`education.${type}-thesis` !== t(`education.${type}-thesis`) && (
        <div className='component'>
          <DescriptionOutlinedIcon className='icon'/>
          <span>{t(`education.${type}-thesis`)}</span>
        </div>
      )}
      {`education.${type}-supervisor` !== t(`education.${type}-supervisor`) && (
        <div className='component'>
          <Person2OutlinedIcon className='icon'/>
          <span>{t(`education.${type}-supervisor`)}</span>
        </div>
      )}
    </div>
  )
}

export default EducationItem
