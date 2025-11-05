const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

type UtmData = Record<UtmKey, string> & {
  ts: string; // ISO timestamp
  page: string; // landing URL
  referrer: string; // document.referrer
};

function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

function extractUtm(): Partial<UtmData> {
  const params = getQueryParams();
  const data: Partial<UtmData> = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      (data as Record<string, string>)[key] = val;
      hasAny = true;
    }
  }

  if (!hasAny) return {};

  data.ts = new Date().toISOString();
  data.page = window.location.href;
  data.referrer = document.referrer || '';
  return data;
}

function computeCookieAttributes(days = 180): string {
  const maxAge = days * 24 * 60 * 60;
  const isHttps = window.location.protocol === 'https:';

  // If you later host this under a shared root domain (e.g., mails.com),
  // set SHARED_ROOT_DOMAIN accordingly to enable cross-subdomain cookies.
  const SHARED_ROOT_DOMAIN = 'mails.com'; // change when moving to *.mails.com

  const host = window.location.hostname;
  const shareAcrossSubdomains =
    host === SHARED_ROOT_DOMAIN || host.endsWith(`.${SHARED_ROOT_DOMAIN}`);

  const domainPart = shareAcrossSubdomains ? `; Domain=.${SHARED_ROOT_DOMAIN}` : '';
  const securePart = isHttps ? '; Secure' : '';

  return `; Path=/; Max-Age=${maxAge}; SameSite=Lax${securePart}${domainPart}`;
}

function setCookie(name: string, value: string, days = 180) {
  const attrs = computeCookieAttributes(days);
  document.cookie = `${name}=${encodeURIComponent(value)}${attrs}`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

(function main() {
  try {
    const utm = extractUtm();
    if (Object.keys(utm).length === 0) return;

    const serialized = JSON.stringify(utm);

    // Update last-touch on every new UTM arrival
    setCookie('utm_last', serialized);

    // Set first-touch only if it does not exist
    if (!getCookie('utm_first')) {
      setCookie('utm_first', serialized);
    }

    try {
      localStorage.setItem('utm', serialized);
    } catch {}
  } catch {}
})();


