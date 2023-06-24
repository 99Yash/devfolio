import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)', '/portfolio/(.*)'],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //Dont do anything
      return NextResponse.next();
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
};
