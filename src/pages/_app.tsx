import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div id="__next">
      <Header />
      <div className="main-content">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
};

export default appWithTranslation(App);
