import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth/next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import { authOptions } from '@/lib/utils/authOptions'
import { findCommitShaByDate, listPrivatePdfs } from '@/lib/utils/privateGithub'
import styles from '@/styles/private.module.css'

interface FileItem { name: string, size: number }
interface Props {
  files: FileItem[]
  snapshotDate: string | null
  snapshotRef: string | null
  hasSnapshot: boolean
}

function normalizeDateParam (value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value
  if (raw == null) return null
  const trimmed = raw.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null
  const [y, m, d] = trimmed.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  if (Number.isNaN(dt.valueOf())) return null
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null
  return trimmed
}

function buildPdfUrl (name: string, ref: string | null): string {
  const base = `/api/private/pdf/${encodeURIComponent(name)}`
  if (ref == null || ref.trim() === '') return base
  return `${base}?ref=${encodeURIComponent(ref)}`
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (session == null) {
    const callback = ctx.resolvedUrl ?? '/private'
    return { redirect: { destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(callback)}`, permanent: false } }
  }
  const allowed = (process.env.GITHUB_ALLOWED_LOGINS ?? '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  const login = ((session.user as any)?.login as string | undefined)?.toLowerCase()
  if (login == null || !allowed.includes(login)) return { notFound: true }

  const snapshotDate = normalizeDateParam(ctx.query.date)
  let snapshotRef: string | null = null
  let hasSnapshot = true
  let files: FileItem[] = []

  if (snapshotDate != null) {
    snapshotRef = await findCommitShaByDate(snapshotDate)
    if (snapshotRef != null) {
      const items = await listPrivatePdfs(snapshotRef)
      files = items.map(it => ({ name: it.name, size: it.size }))
    } else {
      hasSnapshot = false
    }
  } else {
    const items = await listPrivatePdfs()
    files = items.map(it => ({ name: it.name, size: it.size }))
  }

  const locale = ctx.locale ?? ctx.defaultLocale ?? 'en'
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      files,
      snapshotDate,
      snapshotRef,
      hasSnapshot
    }
  }
}

function formatSize (n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '0 B'
  const u = ['B', 'KB', 'MB', 'GB', 'TB'] as const
  const e = Math.min(u.length - 1, Math.floor(Math.log(n) / Math.log(1024)))
  const v = n / Math.pow(1024, e)
  return `${v >= 100 ? v.toFixed(0) : v.toFixed(1)} ${u[e]}`
}

export default function PrivatePage ({ files, snapshotDate, snapshotRef, hasSnapshot }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(snapshotDate ?? '')
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    setSelectedDate(snapshotDate ?? '')
  }, [snapshotDate])

  const showToast = (msg: string): void => {
    setToast(msg)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => { setToast(null) }, 1200)
  }

  const applyDate = (next: string): void => {
    if (next === (snapshotDate ?? '')) return
    const query = { ...router.query }
    if (next.trim() === '') {
      delete (query as Record<string, string | string[]>).date
    } else {
      query.date = next
    }
    void router.push({ pathname: router.pathname, query })
  }

  const handleDateChange = (next: string): void => {
    setSelectedDate(next)
    applyDate(next)
  }

  const copyLink = async (path: string, label: string): Promise<void> => {
    const url = `${window.location.origin}${path}`
    await navigator.clipboard?.writeText(url)
    showToast(`${label} のリンクをコピーしました`)
  }

  const hasFiles = files.length > 0
  const emptyMessage = !hasSnapshot
    ? '指定日以前の履歴が見つかりませんでした。'
    : (snapshotDate != null ? '指定日のPDFがありません。' : 'PDFがありません。')

  return (
    <Layout title="Private">
      <Section id="private" title="Papers">
        <HorizontalLine />
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="pdf-date" className={styles.filterLabel}>日付</label>
            <input
              id="pdf-date"
              type="date"
              className={styles.filterInput}
              value={selectedDate}
              onChange={(event) => { handleDateChange(event.target.value) }}
            />
            {selectedDate !== '' && (
              <button
                type="button"
                className={styles.filterButton}
                onClick={() => { handleDateChange('') }}
              >
                最新に戻す
              </button>
            )}
          </div>
          <div className={styles.filterMeta}>
            {snapshotDate != null ? `${snapshotDate} 時点` : '最新'}
          </div>
        </div>
        {!hasFiles && (
          <div className={styles.notice}>
            {emptyMessage}
          </div>
        )}
        <div className={styles.rows}>
          {files.map((f, i) => {
            const openUrl = buildPdfUrl(f.name, snapshotRef)
            const downloadUrl = `${openUrl}${openUrl.includes('?') ? '&' : '?'}download=1`
            return (
              <React.Fragment key={f.name}>
                <div className={`${styles.row} publication-item`}>
                  <div className={styles.left}>
                    <span className={`highlight ${styles.title}`}>
                      <ExternalLink url={openUrl} text={f.name} bold />
                    </span>
                    <div className={`venue ${styles.meta}`}>
                      <span className="venue-name">{formatSize(f.size)}</span>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <a className={styles.action} href={openUrl} target="_blank" rel="noopener noreferrer">開く</a>
                    <a className={styles.action} href={downloadUrl}>ダウンロード</a>
                    <button
                      type="button"
                      className={styles.action}
                      onClick={() => { copyLink(openUrl, f.name).catch(console.error) }}
                      aria-label={`${f.name} のリンクをコピー`}
                    >
                      リンクをコピー
                    </button>
                  </div>
                </div>
                {i < files.length - 1 && <HorizontalLine main={false} />}
              </React.Fragment>
            )
          })}
        </div>
      </Section>

      {toast !== null && toast !== '' && (
        <div
          className={`${styles.toast} ${toast !== '' ? styles.toastShow : ''}`}
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}
    </Layout>
  )
}
