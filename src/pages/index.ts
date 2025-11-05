import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

export const prerender = false;

export const GET: APIRoute = ({ site, request }) => {
  // Build absolute URL for redirect (Node's Response.redirect requires absolute URL)
  const base = site ?? new URL(request.url).origin;
  const target = new URL(getRelativeLocaleUrl('en'), base);
  return Response.redirect(target.toString(), 308);
};


