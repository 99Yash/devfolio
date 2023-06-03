import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { theme } from '@/lib/utils/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider store={store}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
          {...pageProps}
        >
          <Component {...pageProps} />
        </ClerkProvider>
      </Provider>
    </ChakraProvider>
  );
}
