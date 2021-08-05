import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutPage from '../layout/layout'
import { Provider } from 'next-auth/client'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps?.session} >
      <LayoutPage>
        <Component {...pageProps} />
      </LayoutPage>
    </Provider>
  )
}
export default MyApp
