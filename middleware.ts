import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'th'];
const defaultLocale = 'en';

function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? '';
  const headers = { 'accept-language': acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();
  const matched = match(languages, locales, defaultLocale);

  // ถ้า match แล้วเป็น "th" ให้บังคับกลับไปเป็น defaultLocale
  return matched === 'th' ? defaultLocale : matched;
}

export function middleware(request: any) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get(process.env.NEXT_PUBLIC_COOKIES_NAME);

  const locale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || new RegExp(`^/${loc}$`).test(pathname)
  );
  console.log("isLoggedIn: ", isLoggedIn);

  if (!locale) {
    // ไม่มี locale prefix → redirect ไปยัง path ที่มี locale
    const detected = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${detected}${pathname}`, request.url)
    );
  }

  // ถ้าเข้า /[locale]/login แล้ว login อยู่แล้ว → redirect ไป dashboard
  if (pathname === new RegExp(`^/${locale}$`) && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // ถ้ายังไม่ login และไม่ใช่ path login → redirect ไป login
  if (!isLoggedIn && pathname !== `/${locale}/login`) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (!isLoggedIn && !pathname.includes('/login')) {
    const detected = getLocale(request);
    return NextResponse.redirect(new URL(`/${detected}/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', // match ทุกหน้า ยกเว้น static/api
  ],
};