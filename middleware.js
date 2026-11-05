import { ipAddress, next } from '@vercel/functions';

// ===== DXXLX VISIT LOGGING ONLY — NO filter, NO block =====
// Har visit ko note karo (bot ho ya real user — sab): time, page, IP,
// country, region, city, UA (browser + version + phone/PC), ASN, referrer.
// Koi bhi visitor roka nahi jata — sab ko seedha site dikhao.
// Ye logging sirf record ke liye hai (2-hour dxxlx watch sheet).

export default function middleware(request) {
  const url = new URL(request.url);

  const userAgent = (request.headers.get('user-agent') || "").toLowerCase();
  const clientASN = request.headers.get('x-vercel-ip-as-number') || "";
  const clientCountry = request.headers.get('x-vercel-ip-country') || "";
  const clientRegion = request.headers.get('x-vercel-ip-country-region') || "";
  const clientCity = request.headers.get('x-vercel-ip-city') || "";
  const clientIP = ipAddress(request) || "";
  const referer = request.headers.get('referer') || "";

  console.log('[DXXLX-VISIT] ' + JSON.stringify({
    t: new Date().toISOString(),
    path: url.pathname,
    ip: clientIP,
    country: clientCountry || '-',
    region: clientRegion || '-',
    city: clientCity || '-',
    ua: userAgent.slice(0, 200),
    asn: clientASN || '-',
    ref: referer.slice(0, 200) || '-',
  }));

  return next();
}

export const config = {
  matcher: ['/', '/how-to-upload-bulk-reels.html', '/donald-trump-live-update.html'],
};
