import fs from 'fs'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { summary } = req.query as { summary: string }
  const dirPath = path.join(process.cwd(), 'public/assets', String(summary))

  if (!fs.existsSync(dirPath)) {
    res.status(404).json({ error: 'Summary not found' })
    return
  }

  const files = fs.readdirSync(dirPath)
  const fileUrls = files.map((file) => ({
    name: file,
    url: `/assets/${summary}/${file}`
  }))

  res.status(200).json(fileUrls)
}
