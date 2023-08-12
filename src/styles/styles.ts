import { Inter } from 'next/font/google';
export const ACCENT_COLOR = '#00ced1';
export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: [
    'latin-ext',
    'latin',
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'greek-ext',
    'vietnamese',
  ],
});
