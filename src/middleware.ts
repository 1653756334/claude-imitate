import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from 'negotiator';

const locales = ["en", "zh"];
const defaultLocale = "zh";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = getLocale(request);

  // if (locale === "zh") {
  //   if (pathnameHasLocale && pathname.startsWith("/zh/")) {
  //     // 如果路径以 /zh/ 开头，去掉 /zh 前缀
  //     const newPathname = pathname.replace(/^\/zh/, '');
  //     return NextResponse.rewrite(new URL(newPathname, request.url));
  //   }
  //   // 对于中文，直接访问请求的路径
  //   return NextResponse.rewrite(new URL(pathname, request.url));
  // }

  // 对于其他语言，如果路径没有语言前缀，则添加
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // 如果已经有正确的语言前缀，不做任何改变
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next|favicon.ico).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
