const GH_API = 'https://api.github.com'
const OWNER = process.env.PRIVATE_REPO_OWNER ?? ''
const REPO = process.env.PRIVATE_REPO_NAME ?? ''
const BRANCH = process.env.PRIVATE_REPO_BRANCH ?? 'main'
const TOKEN = process.env.GH_PRIVATE_REPO_TOKEN ?? ''
const REF_SAFE_RE = /^[0-9A-Za-z._/-]+$/

function ghHeaders (accept: 'json' | 'raw'): Record<string, string> {
  const h: Record<string, string> = {
    Authorization: `Bearer ${TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
  h.Accept = accept === 'raw' ? 'application/vnd.github.raw' : 'application/vnd.github+json'
  return h
}

function normalizeRef (ref?: string | null): string | null {
  if (ref == null) return null
  const trimmed = ref.trim()
  if (trimmed === '') return null
  if (!REF_SAFE_RE.test(trimmed) || trimmed.includes('..')) return null
  return trimmed
}

function buildRefQuery (ref?: string | null, fallback?: string): string {
  const cleaned = normalizeRef(ref)
  const resolved = cleaned ?? (fallback ?? '').trim()
  if (resolved === '') return ''
  const params = new URLSearchParams({ ref: resolved })
  return `?${params.toString()}`
}

export async function findCommitShaByDate (date: string): Promise<string | null> {
  const trimmed = date.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null
  const params = new URLSearchParams({
    path: 'pdf',
    sha: BRANCH,
    until: `${trimmed}T23:59:59Z`,
    per_page: '1'
  })
  const url = `${GH_API}/repos/${OWNER}/${REPO}/commits?${params.toString()}`
  const res = await fetch(url, { headers: ghHeaders('json') })
  if (!res.ok) throw new Error(`GitHub commits failed: ${res.status}`)
  const items = (await res.json()) as any[]
  const sha = items?.[0]?.sha
  if (typeof sha !== 'string' || sha.trim() === '') return null
  return sha
}

export async function listPrivatePdfs (ref?: string | null): Promise<Array<{ name: string, path: string, size: number, sha: string }>> {
  const url = `${GH_API}/repos/${OWNER}/${REPO}/contents/pdf${buildRefQuery(ref, BRANCH)}`
  const res = await fetch(url, { headers: ghHeaders('json') })
  if (res.status === 404) return []
  if (!res.ok) throw new Error(`GitHub list failed: ${res.status}`)
  const items = (await res.json()) as any[]
  return (items ?? [])
    .filter((it) => it.type === 'file' && typeof it.name === 'string' && it.name.toLowerCase().endsWith('.pdf'))
    .map((it) => ({ name: it.name, path: it.path, size: it.size, sha: it.sha }))
}

export async function fetchPdfBuffer (filePath: string, ref?: string | null): Promise<Buffer> {
  if (!filePath.startsWith('pdf/') || filePath.includes('..')) {
    throw new Error('Forbidden path')
  }

  // まず raw 取得（~100MB まで）
  {
    const url = `${GH_API}/repos/${OWNER}/${REPO}/contents/${encodeURI(filePath)}${buildRefQuery(ref, BRANCH)}`
    const res = await fetch(url, { headers: ghHeaders('raw') })
    if (res.ok) {
      const ab = await res.arrayBuffer()
      return Buffer.from(ab)
    }
  }

  // フォールバック：metadata -> Blobs API（<=100MB）
  {
    const metaUrl = `${GH_API}/repos/${OWNER}/${REPO}/contents/${encodeURI(filePath)}${buildRefQuery(ref, BRANCH)}`
    const metaRes = await fetch(metaUrl, { headers: ghHeaders('json') })
    if (!metaRes.ok) throw new Error('Not Found')
    const meta = await metaRes.json()
    const sha = meta?.sha as string | undefined
    if (sha == null || sha.trim() === '') throw new Error('Not Found')

    const blobUrl = `${GH_API}/repos/${OWNER}/${REPO}/git/blobs/${sha}`
    const blobRes = await fetch(blobUrl, { headers: ghHeaders('json') })
    if (!blobRes.ok) throw new Error('Not Found')
    const blobJson = await blobRes.json()
    const contentB64 = blobJson?.content as string | undefined
    if (contentB64 == null || contentB64.trim() === '') throw new Error('Not Found')
    return Buffer.from(contentB64, 'base64')
  }
}
