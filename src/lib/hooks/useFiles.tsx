import { useEffect, useState } from 'react'

const useFiles = (conferenceName: string): string[] => {
  const [files, setFiles] = useState<string[]>([])

  const fetchData = async (): Promise<void> => {
    const response = await fetch(`/api/files?conferenceName=${conferenceName}`)
    const data = await response.json()
    setFiles(data.files as string[])
  }

  useEffect(() => {
    void fetchData()
  }, [conferenceName])

  return files
}

export default useFiles
