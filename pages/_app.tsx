import '~/src/styles/index.css'
import 'focus-visible'

import { AppProps } from 'next/app'

import { Layout } from '~/src/components/layout/Layout'
import useWindowNarrow from '~/src/hooks/useWindowNarrow'

function MyApp({ Component, pageProps }: AppProps) {
  useWindowNarrow()

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
