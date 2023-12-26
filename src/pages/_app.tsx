import 'katex/dist/katex.min.css';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { useConditionalRedirect } from '../lib/hooks/useConditionalRedirect';
import store from '../reducks/store/store';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  useConditionalRedirect({
    condition: useRouter().pathname === '/blog',
    redirectTo: '/blog-under-construction',
  });

  return (
    <Provider store={store}>
      <div id="__next">
        <Header />
        <div className="main-content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default appWithTranslation(App);
