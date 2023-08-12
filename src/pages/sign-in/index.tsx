import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { Particles } from '@/components/utils/particles';
import { inter } from '@/styles/styles';

const page = () => {
  return (
    <div className={`h-screen flex justify-center items-center `}>
      <Particles
        quantity={105}
        color="#76e041"
        className="absolute inset-0 -z-10 "
      />
      <SignIn
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

export default page;
