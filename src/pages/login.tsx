import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <SignIn
    path="/login"
    routing="path"
    signUpUrl="/login"
    afterSignInUrl={'/'}
  />
);

export default SignInPage;
