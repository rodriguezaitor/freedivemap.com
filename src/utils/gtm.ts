/**
 * Google Tag Manager Event Tracking
 * 
 * Helper functions to send events to GTM via dataLayer
 */

interface GTMEvent {
  event: string;
  [key: string]: any;
}

/**
 * Send an event to Google Tag Manager
 * 
 * @param eventName - The name of the event (e.g., 'button_click', 'page_view')
 * @param eventData - Additional data to send with the event
 * 
 * @example
 * trackEvent('button_click', {
 *   button_name: 'Browse Destinations',
 *   button_location: 'hero_section'
 * });
 */
export function trackEvent(eventName: string, eventData: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  
  const event: GTMEvent = {
    event: eventName,
    ...eventData,
  };
  
  // Push to dataLayer (works with Partytown)
  if (window.dataLayer) {
    window.dataLayer.push(event);
  }
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, buttonLocation?: string, buttonUrl?: string): void {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    button_url: buttonUrl,
  });
}

/**
 * Track link clicks
 */
export function trackLinkClick(linkText: string, linkUrl: string, linkLocation?: string): void {
  trackEvent('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_location: linkLocation,
  });
}

/**
 * Track destination views
 */
export function trackDestinationView(destinationName: string, region: string, country: string, city: string): void {
  trackEvent('destination_view', {
    destination_name: destinationName,
    region,
    country,
    city,
  });
}

/**
 * Track region/country/city navigation
 */
export function trackNavigation(type: 'region' | 'country' | 'city', name: string, slug: string): void {
  trackEvent('navigation', {
    navigation_type: type,
    navigation_name: name,
    navigation_slug: slug,
  });
}

/**
 * Track search events (if you add search in the future)
 */
export function trackSearch(searchTerm: string, resultsCount?: number): void {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

