export const GA_ID = process.env.GA_ID ?? ''

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const pageView = (url: string): void => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_ID, {
      page_path: url
    })
  }
}
