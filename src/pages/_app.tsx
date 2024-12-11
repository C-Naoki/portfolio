import '@/styles/globals.css'
import 'katex/dist/katex.min.css'

import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'

import type { AppProps } from 'next/app'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { usePageView } from '@/lib/hooks/usePageView'
import store from '@/reducks/store/store'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  usePageView()

  return (
    <Provider store={store}>
      <div id='__next'>
        <Header />
        <div className='main-content'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default appWithTranslation(App)
