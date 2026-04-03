import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'

import { resolvePublicAssetDirectory } from '@/lib/utils/publicAssets'

export default async function handler (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { summary } = req.query
  const summaryName = Array.isArray(summary) ? summary[0] : summary
  const dirPath = resolvePublicAssetDirectory(summary)

  if (dirPath == null || typeof summaryName !== 'string' || summaryName.trim() === '') {
    res.status(400).json({ error: 'Invalid summary path' })
    return
  }

  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    res.status(404).json({ error: 'Summary not found' })
    return
  }

  const files = fs.readdirSync(dirPath)
  const fileUrls = files.map((file) => ({
    name: file,
    url: `/assets/${summaryName}/${file}`
  }))

  res.status(200).json(fileUrls)
}
