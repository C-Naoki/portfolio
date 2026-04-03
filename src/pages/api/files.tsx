import { readdir, stat } from 'fs/promises'

import type { NextApiRequest, NextApiResponse } from 'next'

import { resolvePublicAssetDirectory } from '@/lib/utils/publicAssets'

interface FileListResponse {
  files: string[]
}

const fileCache = new Map<string, string[]>()

async function getFileList (directoryPath: string): Promise<string[]> {
  const cachedFiles = fileCache.get(directoryPath)
  if (cachedFiles !== undefined) {
    return cachedFiles
  }

  const files = await readdir(directoryPath)
  const pdfFiles = await Promise.all(files.filter(file => file.endsWith('.pdf')).map(async (file) => {
    return file
  }))

  fileCache.set(directoryPath, pdfFiles)
  setTimeout(() => fileCache.delete(directoryPath), 1000 * 60 * 60 * 24)

  return pdfFiles
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<FileListResponse>): Promise<void> {
  const directoryPath = resolvePublicAssetDirectory(req.query.conferenceName)
  if (directoryPath == null) {
    res.status(400).json({ files: [] })
    return
  }

  try {
    const directory = await stat(directoryPath)
    if (!directory.isDirectory()) {
      res.status(404).json({ files: [] })
      return
    }

    const pdfFiles = await getFileList(directoryPath)
    res.status(200).json({ files: pdfFiles })
  } catch (err) {
    console.error(err)
    res.status(500).json({ files: [] })
  }
}
