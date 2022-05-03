import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ApolloProvider  } from '@apollo/react-hooks'
import client from "../apollo-client";


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ApolloProvider client={client}>
     <Component {...pageProps} />
     </ApolloProvider>
    )
}

export default MyApp
