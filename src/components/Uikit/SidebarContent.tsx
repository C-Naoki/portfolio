import React from 'react'

import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  profileText: {
    fontSize: '0.9rem'
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1991db'
    },
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 'bold',
    height: '20px',
    width: '170px',
    fontSize: '0.7rem'
  },
  iconStyle: {
    fontSize: '1.0rem',
    width: '14px',
    height: '14px'
  }
}))

const SidebarContent = (): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <div className={classes.sidebar}>
      <Image src='/images/profile.jpg' alt='Naoki Chihara' className={classes.profileImage} />
      <h3>Naoki Chihara</h3>
      <p className={classes.profileText} dangerouslySetInnerHTML={{ __html: t('profile').replace(/\n/g, '<br>') }} />
      <Link target='_blank' rel='noopener noreferrer' href='https://twitter.com/C__Naoki' passHref>
        <Button
          variant='contained'
          className={classes.followButton}
          startIcon={<FontAwesomeIcon icon={faTwitter} className={classes.iconStyle} />}
          component='a'
          target='_blank'
          rel='noopener noreferrer'
        >
          Follow @C__Naoki
        </Button>
      </Link>
      <div>📌 Contents</div>
    </div>
  )
}

export default SidebarContent
