import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { surName, name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "cc.mail.osaka-u.ac.jp",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'お問い合わせフォーム <portfolio.send.only@gmail.com>',
      to: 'naoki88@sanken.osaka-u.ac.jp',
      subject: `Auto: ${subject}`,
      text: `名前: ${surName} ${name}\nメール: ${email}\n\n${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ status: 'Success' });
    } catch (error) {
      res.status(500).json({ status: 'Error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
