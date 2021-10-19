import "../styles/globals.css"
import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import BgMusic from '../components/BgMusic';
import { AuthProvider } from '../helpers/AuthContext';
import { TezosProvider } from '../helpers/TezosContext';
import { NFTProvider } from '../helpers/NFTContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <TezosProvider>
        <AuthProvider>
          <NFTProvider>
            <CssBaseline />
            <Component {...pageProps} />
            <BgMusic />
          </NFTProvider>
        </AuthProvider>
      </TezosProvider>
    </GeistProvider>
  )
}
export default MyApp
