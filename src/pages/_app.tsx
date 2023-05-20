import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
        {...pageProps}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ClerkProvider>
    </ChakraProvider>
  );
}
