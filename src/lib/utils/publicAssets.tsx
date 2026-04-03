import path from 'path'

const publicAssetsRoot = path.resolve(process.cwd(), 'public', 'assets')

export function resolvePublicAssetDirectory (value: string | string[] | undefined): string | null {
  const rawValue = Array.isArray(value) ? value[0] : value
  if (typeof rawValue !== 'string') return null

  const trimmedValue = rawValue.trim()
  if (trimmedValue === '') return null

  const resolvedPath = path.resolve(publicAssetsRoot, trimmedValue)
  const relativePath = path.relative(publicAssetsRoot, resolvedPath)

  if (
    relativePath === '' ||
    relativePath.startsWith('..') ||
    path.isAbsolute(relativePath)
  ) {
    return null
  }

  return resolvedPath
}
