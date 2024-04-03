import { readdir } from 'fs/promises'
import path from 'path'

import type { NextApiRequest, NextApiResponse } from 'next'

interface FileListResponse {
  files: string[]
}

const fileCache = new Map()

async function getFileList (directoryPath: string): Promise<string[]> {
  if (fileCache.has(directoryPath)) {
    return fileCache.get(directoryPath)
  }

  const files = await readdir(directoryPath)
  const pdfFiles = files.filter(file => file.endsWith('.pdf'))

  fileCache.set(directoryPath, pdfFiles)
  setTimeout(() => fileCache.delete(directoryPath), 1000 * 60 * 60 * 24)

  return pdfFiles
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<FileListResponse>): Promise<void> {
  const conferenceName = req.query.conferenceName as string
  const directoryPath = path.join(process.cwd(), 'public', 'assets', conferenceName)

  try {
    const pdfFiles = await getFileList(directoryPath)
    res.status(200).json({ files: pdfFiles })
  } catch (err) {
    console.error(err)
    res.status(500).json({ files: [] })
  }
}
