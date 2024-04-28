import { NextResponse } from 'next/server';

import { auth } from './auth';

export default auth((req) => {
  // Clone the URL
  const url = req.nextUrl.clone();

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  // Rewrite to subdomain
  if (subdomain) {
    // Subdomain available, rewriting
    console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // // Unauthenticated Redirect to '/login'
  // if (!req.auth && url.pathname !== '/login') {
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  // // Authenticated Redirect to '/'
  // if (req.auth && url.pathname === '/login') {
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
});

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
