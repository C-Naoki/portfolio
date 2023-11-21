import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import store from '../reducks/store/store'; // Redux ストアをインポート
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}> {/* Redux Provider を追加 */}
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
