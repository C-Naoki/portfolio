import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { GA_ID, pageView } from '@/lib/utils/gtag'

export const usePageView = (): void => {
  const router = useRouter()
  useEffect(() => {
    if (GA_ID === '') {
      return
    }

    const handleRouteChange = (url: string, { shallow = false }: { shallow: boolean }): void => {
      if (!shallow) {
        pageView(url)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
