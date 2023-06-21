import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/signin(.*)', '/signup(.*)', '/portfolio/(.*)'],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //Dont do anything
      console.log('dwe');
      return NextResponse.next();
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
};
