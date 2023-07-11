import { SignUp } from '@clerk/nextjs';
import React from 'react';
import { Inter } from 'next/font/google';
import { Particles } from '@/components/utils/particles';

const inter = Inter({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const index = () => {
  return (
    <div className={`h-screen flex justify-center items-center `}>
      <Particles
        quantity={65}
        color="#23c7d0"
        className="absolute inset-0 -z-10 "
      />

      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#1e1d1d',
          },
          elements: {
            rootBox: `bg-gray-950`,
            formButtonPrimary: `bg-gray-200 text-gray-900 hover:bg-gray-300 ${inter.className} `,
            card: 'bg-gray-950',
            header: `bg-gray-900 bg-clip-text ${inter.className} `,
            headerTitle: `font-medium`,
            headerSubtitle: ``,
            socialButtonsBlockButtonText: `${inter.className} font-normal text-gray-300 `,
            formFieldInput: `bg-inherit`,
            formFieldLabel: `text-gray-300 font-normal `,
            footerActionLink: `text-sky-300 hover:text-sky-400 `,
          },
        }}
      />
    </div>
  );
};

export default index;
