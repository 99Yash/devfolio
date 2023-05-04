import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
        {...pageProps}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
}
