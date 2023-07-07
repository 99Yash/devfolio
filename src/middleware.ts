import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)', '/portfolio/(.*)'],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //Dont do anything
      return NextResponse.next();
    }
    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      // if user tries to access protected route, redirect to sign in
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
};
