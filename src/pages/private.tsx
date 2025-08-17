import React, { useRef, useState } from 'react'

import { getServerSession } from 'next-auth/next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import ExternalLink from '@/components/Uikit/ExternalLink'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import { authOptions } from '@/lib/utils/authOptions'
import { listPrivatePdfs } from '@/lib/utils/privateGithub'
import styles from '@/styles/private.module.css'

interface FileItem { name: string, size: number }
interface Props { files: FileItem[] }

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (session == null) {
    const callback = ctx.resolvedUrl ?? '/private'
    return { redirect: { destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(callback)}`, permanent: false } }
  }
  const allowed = (process.env.GITHUB_ALLOWED_LOGINS ?? '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  const login = ((session.user as any)?.login as string | undefined)?.toLowerCase()
  if (login == null || !allowed.includes(login)) return { notFound: true }

  const items = await listPrivatePdfs()
  const files = items.map(it => ({ name: it.name, size: it.size }))

  const locale = ctx.locale ?? ctx.defaultLocale ?? 'en'
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      files
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

export default function PrivatePage ({ files }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)
  const showToast = (msg: string): void => {
    setToast(msg)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => { setToast(null) }, 1200)
  }

  const copyLink = async (path: string, label: string): Promise<void> => {
    const url = `${window.location.origin}${path}`
    await navigator.clipboard?.writeText(url)
    showToast(`${label} のリンクをコピーしました`)
  }

  return (
    <Layout title="Private">
      <Section id="private" title="Papers">
        <HorizontalLine />
        <div className={styles.rows}>
          {files.map((f, i) => {
            const openUrl = `/api/private/pdf/${encodeURIComponent(f.name)}`
            const downloadUrl = `${openUrl}?download=1`
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
