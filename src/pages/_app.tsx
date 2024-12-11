import '@/styles/globals.css'
import 'katex/dist/katex.min.css'
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'

import type { AppProps } from 'next/app'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GA_ID, pageView } from '@/lib/utils/gtag'
import store from '@/reducks/store/store'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: string): void => {
      pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <div id='__next'>
        <Header />
        <div className='main-content'>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_ID}');
              `
            }}
          />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default appWithTranslation(App)
