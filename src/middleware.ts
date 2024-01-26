import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  console.log("hi");
  const url = request.nextUrl;
  const useragent = userAgent(request);
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders);
  const viewport = useragent.device.type === "mobile" ? "mobile" : "desktop";
  url.searchParams.set("viewport", viewport);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/chart/:path*",
};

/**
 * {
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Notion/2.1.17 Chrome/112.0.5615.165 Electron/24.2.0 Safari/537.36',
  browser: { name: 'Electron', version: '24.2.0', major: '24' },
  engine: { name: 'Blink', version: '112.0.5615.165' },
  os: { name: 'Mac OS', version: '10.15.7' },
  device: { vendor: 'Apple', model: 'Macintosh', type: undefined },
  cpu: { architecture: undefined },

  {
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Notion/2.1.17 Chrome/112.0.5615.165 Electron/24.2.0 Safari/537.36',
  browser: { name: 'Electron', version: '24.2.0', major: '24' },
  engine: { name: 'Blink', version: '112.0.5615.165' },
  os: { name: 'Mac OS', version: '10.15.7' },
  device: { vendor: 'Apple', model: 'Macintosh', type: undefined },
  cpu: { architecture: undefined },
  isBot: false

  
}
 */

//   'accept',
//   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
//   'accept',
//   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
