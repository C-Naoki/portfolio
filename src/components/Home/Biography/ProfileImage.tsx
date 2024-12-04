import Image from 'next/image'

const ProfileImage = (): JSX.Element => {
  return (
    <div className='profile-image'>
      <Image
        src="/images/profile.jpg"
        alt="My profile photo"
        width={150}
        height={150}
        style={{
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}

export default ProfileImage
