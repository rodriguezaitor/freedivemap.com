import type { APIRoute } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

export const prerender = false;

export const GET: APIRoute = ({ site, request }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Only redirect if it's the production domain (freedivemap.com)
  // Leave freedivemap-com.pages.dev without redirect
  if (hostname === 'freedivemap.com' || hostname === 'www.freedivemap.com') {
    // Build absolute URL for redirect (Node's Response.redirect requires absolute URL)
    const base = site ?? url.origin;
    const target = new URL(getRelativeLocaleUrl('en'), base);
    return Response.redirect(target.toString(), 308);
  }
  
  // For other domains (like freedivemap-com.pages.dev), redirect relatively
  return Response.redirect(getRelativeLocaleUrl('en'), 308);
};


