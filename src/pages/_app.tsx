import { storeWrapper } from '../store';
import '../styles/globals.css';

interface OwnProps {
  Component: React.FC;
}

const MyApp: React.FC<OwnProps> = ({ Component, ...pageProps }) => {
  return <Component {...pageProps} />;
};

export default storeWrapper.withRedux(MyApp);
