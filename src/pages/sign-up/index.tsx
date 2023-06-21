import { SignIn, SignUp } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="w-full h-screen items-center justify-center">
      <SignUp />
    </div>
  );
};

export default SignInPage;
