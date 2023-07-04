import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
};

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'gray.200',
        borderColor: 'gray.400',
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
        },
      },
    },
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      normal: 'normal',
      none: '1',
      shorter: '1.25',
      short: '1.375',
      base: '1.5',
      tall: '1.625',
      taller: '2',
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    fonts: {
      heading: fonts.heading,
      body: fonts.body,
    },
  },
});
