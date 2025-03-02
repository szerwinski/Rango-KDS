import type { AppProps } from 'next/app'
import '../styles/global/global.css'
import { Roboto } from '@next/font/google'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // supabase.auth.signOut()

  }, [])

  return (
    <>
      <style jsx global>
        {`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
        }
        html {
          font-size: 16px;
        }
      `}
      </style>
      <div className='flex flex-col items-start w-full h-full justify-items-stretch'>
        <Head>
          <title>Rango Menu Digital</title>
        </Head>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ToastContainer />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </div>
    </>)
}
