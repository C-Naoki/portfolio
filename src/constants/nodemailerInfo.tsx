interface nodemailerInfoProps {
  host: string
  port: number
  secure: boolean
  email: string
}

const nodemailerInfo: nodemailerInfoProps = {
  host: 'cc.mail.osaka-u.ac.jp',
  port: 465,
  secure: true,
  email: 'naoki88@sanken.osaka-u.ac.jp'
}

export default nodemailerInfo
