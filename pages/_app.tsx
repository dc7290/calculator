import '~/src/styles/index.css'
import 'focus-visible'

import { AppProps } from 'next/app'

import useWindowNarrow from '~/src/hooks/useWindowNarrow'

function MyApp({ Component, pageProps }: AppProps) {
  useWindowNarrow()

  return <Component {...pageProps} />
}

export default MyApp
