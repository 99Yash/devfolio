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
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
}
