import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutPage from '../layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutPage>
      <Component {...pageProps} />
    </LayoutPage>
  )
}
export default MyApp
