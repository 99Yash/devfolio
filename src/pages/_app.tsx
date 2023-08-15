import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { theme } from '@/lib/utils/theme';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { inter } from '@/styles/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: '#1e1d1d',
            colorText: 'rgb(239, 226, 226)',
          },
          baseTheme: dark,
          layout: {
            shimmer: true,
          },
        }}
        {...pageProps}
      >
        <Provider store={store}>
          <Head>
            <title>Devfolio</title>
            <meta
              name="description"
              content="Portfolio generator for developers. Fully responsive. Get a good-looking portfolio instantly to share with your friends and potential recruiters."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Analytics mode="production" debug={false} />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </Provider>
      </ClerkProvider>
    </ChakraProvider>
  );
}
