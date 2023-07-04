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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
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
          <Analytics />
          <Component {...pageProps} />
        </Provider>
      </ClerkProvider>
    </ChakraProvider>
  );
}
