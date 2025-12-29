import { getServerSession } from 'next-auth/next'

import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '@/lib/utils/authOptions'
import { fetchPdfBuffer } from '@/lib/utils/privateGithub'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getServerSession(req, res, authOptions)
  if (session == null) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const login = (session.user as any)?.login as string | undefined
  const allowed = (process.env.GITHUB_ALLOWED_LOGINS ?? '').split(',').map(s => s.trim()).filter(Boolean)
  if (login == null || login.trim() === '' || !allowed.includes(login)) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  const slug = req.query.path
  const segments = Array.isArray(slug) ? slug : [slug]
  const filename = segments.filter(Boolean).join('/')
  const safePath = `pdf/${filename}`

  const download = String(req.query.download ?? '').toLowerCase() // ← 追加
  const rawRef = Array.isArray(req.query.ref) ? req.query.ref[0] : req.query.ref
  const ref = typeof rawRef === 'string' ? rawRef.trim() : ''
  const safeRef = (ref !== '' && /^[0-9A-Za-z._/-]+$/.test(ref) && !ref.includes('..')) ? ref : undefined

  try {
    const buf = await fetchPdfBuffer(safePath, safeRef)
    res.setHeader('Content-Type', 'application/pdf')
    const disp = (download === '1' || download === 'true') ? 'attachment' : 'inline' // ← 追加
    res.setHeader('Content-Disposition', `${disp}; filename="${encodeURIComponent(filename)}"`)
    res.setHeader('Cache-Control', 'private, no-store')
    res.status(200).send(buf)
  } catch {
    res.status(404).json({ error: 'Not Found' })
  }
}
