import { readdir } from 'fs/promises'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'

interface FileListResponse {
  files: string[]
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<FileListResponse>): Promise<void> {
  const conferenceName = req.query.conferenceName as string
  const directoryPath = path.join(process.cwd(), 'public', 'assets', conferenceName)

  try {
    const files = await readdir(directoryPath)
    const pdfFiles = files.filter(file => file.endsWith('.pdf'))
    res.status(200).json({ files: pdfFiles })
  } catch (err) {
    console.error(err)
    res.status(500).json({ files: [] })
  }
}
